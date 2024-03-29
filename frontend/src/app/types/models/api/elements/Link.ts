export interface IElementsLink {
  id: number;
  __component: "elements.link";
  label: string | null;
  url: string | null;
  newTab: boolean | null;
  category: "repo" | "documentation" | "dataset" | "team-member" | null;
}
