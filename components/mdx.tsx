import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdx-components";

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof mdxComponents;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote 
      {...props} 
      components={{ ...mdxComponents, ...(props.components || {}) }} 
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm], // << --- ESTA ES LA CLAVE
        },
      }}
    />
  );
}