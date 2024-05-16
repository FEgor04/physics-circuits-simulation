import { ElectricalComponent }  from "@/shared/simulation";

type SchemeID = number;

export type Scheme = {
  id: SchemeID;
  name: string;
  authorName: string;
  canEdit: boolean;
  components: Array<ElectricalComponent>;
};
