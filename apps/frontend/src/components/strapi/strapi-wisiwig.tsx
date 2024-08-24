import type { GetValues } from "@chooseresto/backend";

export default function StrapiWysiwig(props: GetValues<"block.wysiwig">) {
  return <div>{props.content}</div>;
}
