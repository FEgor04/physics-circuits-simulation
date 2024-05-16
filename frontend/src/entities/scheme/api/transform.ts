import { ElectricalComponentDto, SchemeResponse } from "@/shared/api/index.schemas";
import { ElectricalComponentWithID, WithID } from "@/shared/simulation";
import { Scheme } from "../model/scheme";

export function fromDTO(dto: SchemeResponse): Scheme {
  return {
    id: dto.id,
    canEdit: dto.canEdit,
    authorName: dto.authorName,
    name: dto.name,
    components: dto.components?.map(componentFromDTO) ?? [],
  };
}
  
// const componentsTypes: Array<ElectricalComponent["_type"]> = [
//   "wire",
//   "source",
//   "resistor",
//   "sourceDC",
//   "voltmeter",
//   "ampermeter",
// ];

export function componentFromDTO(_dto: ElectricalComponentDto): WithID<ElectricalComponentWithID> {
  throw new Error("TODO!")
}
