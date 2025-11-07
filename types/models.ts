// ==========================================
// TIPOS BASE Y UTILIDADES
// ==========================================

// Control de visibilidad para cada campo en el PDF
type FieldVisibility = {
    showTitle: boolean;  // T: Muestra/oculta el label
    showValue: boolean;  // V: Muestra/oculta el valor
};

// Para campos con rich text (descripción, notas)
type RichTextContent = Array<{
    type: 'paragraph' | 'bulleted-list' | 'numbered-list' | 'list-item' | 'heading';
    children: Array<{
        text?: string;
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
    } | RichTextContent[number]>;
}>;

// Tipos de descuento
type DiscountType = 'percentage' | 'fixed';

// ==========================================
// EMPRESA / MI NEGOCIO
// ==========================================

type Business = {
    id: string;
    userId: string;  // Propietario
    
    // Datos de la empresa
    logo?: string;  // URL o base64
    name: string;
    taxId: string;  // RUT / Tax ID
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;  // ISO code (CL, US, etc)
    
    // Control de visibilidad en documentos
    visibility: {
        logo: FieldVisibility;
        name: FieldVisibility;
        taxId: FieldVisibility;
        email: FieldVisibility;
        phone: FieldVisibility;
        address: FieldVisibility;
        city: FieldVisibility;
        country: FieldVisibility;
    };
    
    // Metadata
    createdAt: Date;
    updatedAt: Date;
};

// ==========================================
// CLIENTES
// ==========================================

type Client = {
    id: string;
    businessId: string;  // Pertenece a una empresa
    
    // Datos del cliente
    name: string;
    contactPerson?: string;
    email: string;
    phone: string;
    taxId?: string;
    address?: string;
    project?: string;
    
    // Control de visibilidad
    visibility: {
        name: FieldVisibility;
        contactPerson: FieldVisibility;
        email: FieldVisibility;
        phone: FieldVisibility;
        taxId: FieldVisibility;
        address: FieldVisibility;
        project: FieldVisibility;
    };
    
    // Metadata
    createdAt: Date;
    updatedAt: Date;
};

// ==========================================
// PRODUCTOS Y SERVICIOS
// ==========================================

type Product = {
    id: string;
    businessId: string;  // Productos por empresa
    
    // Datos del producto
    code: string;  // SKU o código interno
    name: string;
    description: RichTextContent;
    
    // Precios por defecto
    defaultPrice: number;
    defaultDiscount?: number;
    defaultDiscountType: DiscountType;
    
    // Metadata
    createdAt: Date;
    updatedAt: Date;
    isArchived: boolean;  // Para no eliminar, solo ocultar
};

// Línea de producto en una cotización (permite override de precio)
type QuoteLineItem = {
    id: string;
    productId: string;
    
    // Datos que pueden ser diferentes a los del producto base
    code: string;
    name: string;
    description: RichTextContent;
    
    // Cantidades y precios específicos de esta cotización
    quantity: number;
    price: number;
    discount: number;
    discountType: DiscountType;
    
    // Calculado (no almacenar, calcular en runtime)
    // subtotal = quantity * price
    // discountAmount = discountType === 'percentage' ? subtotal * (discount / 100) : discount
    // total = subtotal - discountAmount
};

// ==========================================
// VENDEDOR
// ==========================================

type Seller = {
    id: string;
    businessId: string;  // Vendedores por empresa
    userId?: string;  // Puede estar asociado a un usuario del sistema
    
    // Datos del vendedor
    code: string;  // VEN-001
    name: string;
    email: string;
    phone: string;
    
    // Control de visibilidad
    visibility: {
        code: FieldVisibility;
        name: FieldVisibility;
        email: FieldVisibility;
        phone: FieldVisibility;
    };
    
    // Metadata
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
};

// ==========================================
// INFORMACIÓN DE PAGO
// ==========================================

type PaymentInfo = {
    id: string;
    businessId: string;  // Info de pago por empresa
    name: string;  // Nombre descriptivo ej: "Cuenta Principal USD"
    
    // Datos de pago
    paymentTerms?: string;  // ej: "50% adelanto, 50% al entregar"
    paymentMethod?: string;  // ej: "Transferencia bancaria"
    
    // Información bancaria
    bankName?: string;
    accountHolder?: string;
    accountNumber?: string;
    swiftBic?: string;
    iban?: string;
    
    // Notas adicionales
    paymentNotes?: RichTextContent;
    
    // Control de visibilidad
    visibility: {
        paymentTerms: FieldVisibility;
        paymentMethod: FieldVisibility;
        bankName: FieldVisibility;
        accountHolder: FieldVisibility;
        accountNumber: FieldVisibility;
        swiftBic: FieldVisibility;
        iban: FieldVisibility;
        paymentNotes: FieldVisibility;
    };
    
    // Metadata
    createdAt: Date;
    updatedAt: Date;
    isDefault: boolean;  // Puede haber una por defecto
};

// ==========================================
// CONFIGURACIÓN GENERAL
// ==========================================

type DocumentConfig = {
    id: string;
    businessId: string;  // Configuración por empresa
    
    // Configuraciones generales
    currency: string;  // CLP, USD, EUR, etc
    locale: string;  // es-CL, en-US, etc
    paperFormat: 'A4' | 'LETTER' | 'LEGAL';
    taxRate: number;  // 0.19 = 19%, 0.21 = 21%
    
    // Configuraciones adicionales
    logoPosition?: 'left' | 'center' | 'right';
    primaryColor?: string;  // Para personalización visual
    
    // Metadata
    updatedAt: Date;
};

// ==========================================
// PLANTILLAS
// ==========================================

type QuoteTemplate = {
    id: string;
    businessId: string;  // Plantillas por empresa
    
    // Datos de la plantilla
    name: string;
    description?: string;
    
    // Referencias a configuraciones predefinidas
    defaultSellerId?: string;
    defaultPaymentInfoId?: string;
    
    // Productos predefinidos en la plantilla
    defaultLineItems: Omit<QuoteLineItem, 'id'>[];
    
    // Configuración del documento
    documentDetails: {
        documentType: string;  // "Cotización", "Factura", etc
        showNotes: boolean;
        footerNotes?: RichTextContent;
    };
    
    // Visibilidades por defecto
    showBusiness: boolean;
    showClient: boolean;
    showSeller: boolean;
    showPaymentInfo: boolean;
    
    // Metadata
    createdAt: Date;
    updatedAt: Date;
};

// ==========================================
// COTIZACIÓN (DOCUMENTO PRINCIPAL)
// ==========================================

type Quote = {
    id: string;
    businessId: string;  // Empresa emisora
    templateId?: string;  // Si se creó desde una plantilla
    
    // Relaciones
    clientId: string;
    sellerId?: string;
    paymentInfoId?: string;
    
    // Detalles del documento
    documentDetails: {
        documentType: string;  // "Cotización", "Presupuesto", "Factura Pro Forma"
        documentNumber: string;  // AUTO-2024-001
        issueDate: Date;
        validUntil?: Date;
        reference?: string;
        showNotes: boolean;
        footerNotes?: RichTextContent;
        
        visibility: {
            documentType: FieldVisibility;
            documentNumber: FieldVisibility;
            issueDate: FieldVisibility;
            validUntil: FieldVisibility;
            reference: FieldVisibility;
            footerNotes: FieldVisibility;
        };
    };
    
    // Visibilidad de secciones principales
    sections: {
        showBusiness: boolean;
        showClient: boolean;
        showSeller: boolean;
        showPaymentInfo: boolean;
    };
    
    // Líneas de productos/servicios
    lineItems: QuoteLineItem[];
    
    // Configuración del documento (puede override la config general)
    config: {
        currency: string;
        locale: string;
        paperFormat: 'A4' | 'LETTER' | 'LEGAL';
        taxRate: number;
    };
    
    // Totales (calcular en runtime, no almacenar)
    // subtotal = sum(lineItems.map(item => item.quantity * item.price))
    // totalDiscount = sum(lineItems.map(item => item.discountAmount))
    // taxableAmount = subtotal - totalDiscount
    // taxAmount = taxableAmount * taxRate
    // total = taxableAmount + taxAmount
    
    // Estado del documento
    status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
    
    // Metadata
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;  // userId
};

// ==========================================
// USUARIO (SI NO LO TIENES YA)
// ==========================================

type User = {
    id: string;
    email: string;
    name: string;
    
    // Relación con empresas
    defaultBusinessId?: string;  // Empresa por defecto al iniciar
    
    // Metadata
    createdAt: Date;
    updatedAt: Date;
};

// ==========================================
// RELACIÓN USUARIO-EMPRESA (para multi-tenancy)
// ==========================================

type UserBusinessRole = {
    userId: string;
    businessId: string;
    role: 'owner' | 'admin' | 'seller' | 'viewer';
    createdAt: Date;
};