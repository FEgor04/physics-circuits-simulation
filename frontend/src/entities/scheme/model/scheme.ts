import { ElectricalComponentWithID } from "@/shared/simulation";

export type SchemeID = number;

export type Scheme = {
  id: SchemeID;
  name: string;
  authorName: string;
  canEdit: boolean;
  components: Array<ElectricalComponentWithID>;
};
