/**
 * Словарь ошибок при валидации схемы
 **/
export const schemaErrors = {
  noClosedLoop: "Нет замкнутого контура",
  voltmeterError: "Вольтметр соединён с амперметром",
  noCorrectScheme: "Некорректная схема",
  moreThenOneVoltmeter: "Более одного вольтметра на ветке",
  moreThenOneAmpermeter: "Более одного амперметра на ветке",
  idealWire: "Схема содержит идеальный проводник",
  noNodes: "Схема не содержит узлов",
  emptyScheme: "Пустая схема",
} as const;
