import { ElectricalComponentDto, SchemeResponse } from "@/shared/api/index.schemas";
import { Ampermeter, ElectricalComponentWithID, Resistor, Voltmeter, Wire, WithID } from "@/shared/simulation";
import { zElectricalComponent, zSourceDC } from "../model/component";
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

const componentsTypes = ["wire", "resistor", "voltmeter", "ampermeter"] as const;

export function componentFromDTO(dto: ElectricalComponentDto): WithID<ElectricalComponentWithID> {
  if (dto.type == "SOURCE_DC") {
    return zSourceDC.parse({
      id: dto.componentId,
      _type: "sourceDC",
      electromotiveForce: dto.emf!,
      plus: dto.a,
      minus: dto.b,
    });
  }
  if (dto.type == "SOURCE") {
    return {
      id: dto.componentId,
      _type: "source",
      electromotiveForce: dto.emf!,
      internalResistance: dto.resistance!,
      plus: dto.a,
      minus: dto.b,
    };
  }
  return zElectricalComponent.parse({
    id: dto.componentId,
    _type: componentsTypes.find((it) => it.toLowerCase() == dto.type.toLowerCase())!,
    a: dto.a,
    b: dto.b,
    resistance: dto.resistance,
    electromotiveForce: dto.emf,
  }) as WithID<Resistor | Wire | Ampermeter | Voltmeter>;
}
