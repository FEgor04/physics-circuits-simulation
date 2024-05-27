import { ElectricalComponentDto, SchemeResponse } from "@/shared/api/index.schemas";
import {
  Ampermeter,
  ElectricalComponent,
  ElectricalComponentWithID,
  Resistor,
  Rheostat,
  Voltmeter,
  Wire,
  WithID,
} from "@/shared/simulation";
import { zElectricalComponent, zSource, zSourceDC } from "../model/component";
import { Scheme } from "../model/scheme";

export function fromDTO(dto: SchemeResponse): Scheme {
  return {
    id: dto.id,
    canEdit: dto.canEdit,
    authorName: dto.authorName,
    name: dto.name,
    components: dto.components?.map(componentFromDTO) ?? [],
    isEmbedded: dto.isEmbedded,
  };
}

const componentsTypes = ["wire", "resistor", "voltmeter", "ampermeter", "rheostat"] as const;

export function componentFromDTO(dto: ElectricalComponentDto): WithID<ElectricalComponentWithID> {
  if (dto.type == "SOURCE_DC") {
    return zSourceDC.parse({
      id: dto.componentId,
      _type: "sourceDC",
      currentForce: dto.emf!,
      internalResistance: dto.resistance!,
      plus: dto.a,
      minus: dto.b,
    });
  }
  if (dto.type == "SOURCE") {
    return zSource.parse({
      id: dto.componentId,
      _type: "source",
      electromotiveForce: dto.emf!,
      internalResistance: dto.resistance!,
      plus: dto.a,
      minus: dto.b,
    });
  }
  return zElectricalComponent.parse({
    id: dto.componentId,
    _type: componentsTypes.find((it) => it.toLowerCase() == dto.type.toLowerCase())!,
    a: dto.a,
    b: dto.b,
    resistance: dto.resistance,
    electromotiveForce: dto.emf,
  }) as WithID<Resistor | Wire | Ampermeter | Voltmeter | Rheostat>;
}

export function componentToDTO(entity: ElectricalComponentWithID): ElectricalComponentDto {
  return {
    componentId: entity.id,
    type: typeToDTO(entity._type),
    resistance: getResistance(entity),
    emf: getElectromotiveForce(entity),
    a: "a" in entity ? entity.a : entity.plus,
    b: "b" in entity ? entity.b : entity.minus,
  };
}

function typeToDTO(type: ElectricalComponentWithID["_type"]): ElectricalComponentDto["type"] {
  if (type == "sourceDC") {
    return "SOURCE_DC";
  }
  return type.toUpperCase() as Uppercase<Exclude<ElectricalComponentWithID["_type"], "sourceDC">>;
}

function getResistance(entity: ElectricalComponent): number | undefined {
  if ("resistance" in entity) {
    return entity.resistance;
  }
  if ("internalResistance" in entity) {
    return entity.internalResistance;
  }
  return undefined;
}

function getElectromotiveForce(entity: ElectricalComponent): number | undefined {
  if ("electromotiveForce" in entity) {
    return entity.electromotiveForce;
  }
  if ("currentForce" in entity) {
    return entity.currentForce;
  }
  return undefined;
}
