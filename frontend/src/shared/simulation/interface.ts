import { ElectricalComponent } from "./types.ts"

export interface CircuitSimulator {
  /**
   * Добавляет компонент в симуляцию.
   * Если такой компонент уже существует, то заменяет его новым.
   **/
  addComponent(component: ElectricalComponent): void
  deleteComponent(component: ElectricalComponent): void

  /**
   * Возвращает все компоненты в симуляции
   **/
  getAllComponents(): Array<ElectricalComponent>

  /**
   * Заменяет все компоненты переданными
   **/
  setComponents(components: Array<ElectricalComponent>): void
}
