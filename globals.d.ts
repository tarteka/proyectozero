declare module "*.css" {
  const content: object;
  export default content;
}

declare module "*.mdx" {
  export const metadata: unknown;
}
