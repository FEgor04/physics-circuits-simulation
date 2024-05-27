// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useSimulationState } from "@/pages/simulation/model/state.ts";
import { Canvas } from "@/widgets/canvas";
import { GetMeasurementProvider } from "@/features/measurment";
import { SelectComponentProvider } from "@/features/select-component";
import { GetZoomCoefficientProvider } from "@/features/zoom-provider";
import { ElectricalComponentWithID } from "@/shared/simulation";
import "@/shared/assets/katex/katex-min.css";

import Latex from "react-latex-next";

export function EducationalArticle() {
  const example1: Array<ElectricalComponentWithID> = [
    {
      id: 1,
      _type: "source",
      electromotiveForce: 9,
      internalResistance: 0,
      plus: { x: -1, y: 2 },
      minus: { x: -2, y: 2 },
    },
    { id: 3, _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 1 } },
    { id: 4, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
    { id: 5, _type: "wire", a: { x: -1, y: 0 }, b: { x: -2, y: 2 } },
    { id: 6, _type: "wire", a: { x: -1, y: 0 }, b: { x: -1, y: -1 } },
    { id: 7, _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: -1 } },
    { id: 8, _type: "voltmeter", a: { x: -1, y: -1 }, b: { x: 0, y: -1 }, voltage: "unknown" },
    { id: 2, _type: "resistor", a: { x: -1, y: 2 }, b: { x: 0, y: 2 }, resistance: 400 },
    { id: 9, _type: "resistor", a: { x: -1, y: 0 }, b: { x: 0, y: 0 }, resistance: 500 },
  ];
  const example2: Array<ElectricalComponentWithID> = [
    {
      electromotiveForce: 20,
      internalResistance: 5,
      _type: "source",
      minus: { x: -2, y: 2 },
      plus: { x: -1, y: 2 },
      id: 1,
    },
    { resistance: 10, _type: "resistor", a: { x: -1, y: 2 }, b: { x: 0, y: 2 }, id: 2 },
    { _type: "wire", a: { x: 0, y: -1 }, b: { x: 0, y: 0 }, id: 7 },
    { _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: 1 }, id: 8 },
    { _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 2 }, id: 9 },
    { _type: "wire", a: { x: -1, y: 0 }, b: { x: -1, y: -1 }, id: 10 },
    { _type: "wire", a: { x: -1, y: 0 }, b: { x: -2, y: 2 }, id: 12 },
    { resistance: 10, _type: "rheostat", a: { x: -1, y: -1 }, b: { x: 0, y: -1 }, id: 20 },
    { resistance: 10, _type: "resistor", a: { x: -1, y: 0 }, b: { x: 0, y: 0 }, id: 21 },
  ];

  const example1_simulation = useSimulationState(example1);
  const getMeasurementForComponent = (id: number) => {
    const measurements = example1_simulation.simulator.getMeasurementsForComponent(id);
    if (measurements.currency != 0) {
      return measurements.currency;
    }
    return measurements.voltage;
  };

  return (
    <div className="m-auto w-4/6 space-y-4">
      <h1 className="mb-4 mt-4 text-3xl font-bold">Делитель напряжения: схема и расчёт</h1>
      <p>
        Для того, чтобы получить из исходного напряжения лишь его часть используется делитель напряжения (voltage
        divider). Это схема, строящаяся на основе пары резисторов.
      </p>

      <div className="h-80 w-80">
        <GetZoomCoefficientProvider zoomCoefficient={48}>
          <SelectComponentProvider selected={undefined} onSelect={() => {}}>
            <GetMeasurementProvider getCurrentMeasurement={getMeasurementForComponent}>
              <Canvas
                components={example1}
                onUpdateComponentCoords={() => {}}
                onAddComponent={() => {}}
                onUpdateComponent={() => {}}
              />
            </GetMeasurementProvider>
          </SelectComponentProvider>
        </GetZoomCoefficientProvider>
      </div>
      <p>
        В примере, на вход подаются стандартные 9 В. Первый резистор имеет сопротивление 400 Ом. Но какое напряжение
        получится на вольтметре (<Latex>{"$V_{out}$"}</Latex>), подключенном ко второму резистору с сопротивлением 500 Ом?
      </p>
      <p>
        Ток, протекающий через R1 и R2 одинаков пока к выходу источнику постоянного тока ничего не подключено. А
        суммарное сопротивление пары резисторов при последовательном соединении:
      </p>
      <p>
        <Latex>{"$R = R_1 + R_2 = 900 \\text{Ом}$"}</Latex>
      </p>
      <p>Таким образом, сила тока протекающая через резисторы</p>
      <p>
        <Latex>{"$I = \\frac{U}{R} = \\frac{9 В}{900 Ом} = 0.01А = 10мА$"}</Latex>
      </p>
      <p>Теперь, когда нам известен ток в R2, рассчитаем напряжение вокруг него:</p>
      <p>
        <Latex>{"$V_{out} = I \\cdot R_2  = 0.01 А  \\cdot 500 Ом = 5В $"}</Latex>
      </p>
      <p>Или если оcтавить формулу в общем виде:</p>
      <p>
        <Latex>{"$V_{out} = V_{in} \\frac{R_2}{R_1 + R_2}$"}</Latex>
      </p>
      <p>
        Так с помощью пары резисторов мы изменили значение входного напряжения с 9 до 5 В. Это простой способ получить
        несколько различных напряжений в одной схеме, оставив при этом только один источник питания.
      </p>
      <h1 className="mb-4 mt-4 text-3xl font-bold">Применение делителя для считывания показаний датчика</h1>
      <p>
        Другое применение делителя напряжения — это снятие показаний с датчиков. Существует множество компонентов,
        которые меняют своё сопротивление в зависимости от внешних условий. Так термисторы меняют сопротивление от нуля
        до определённого значения в зависимости от температуры, фоторезисторы меняют сопротивление в зависимости от
        интенсивности попадающего на них света и т.д.
      </p>
      <p>
        Если в приведённой выше схеме заменить R1 или R2 на один из таких компонентов, Vout будет меняться в зависимости
        от внешних условий, влияющих на датчик. Подключив это выходное напряжение к аналоговому входу Ардуино, можно
        получать информацию о температуре, уровне освещённости и других параметрах среды.
      </p>
      <p>
        Значение выходного напряжения при определённых параметрах среды можно расcчитать, сопоставив документацию на
        переменный компонент и общую формулу расчёта Vout.
      </p>
      <h1 className="mb-4 mt-4 text-3xl font-bold">Подключение нагрузки</h1>
      <p>
        С делителем напряжения не всё так просто, когда к выходному подключения подключается какой-либо потребитель
        тока, который ещё называют нагрузкой (load):
      </p>
      <div className="h-80 w-80">
        <GetZoomCoefficientProvider zoomCoefficient={48}>
          <SelectComponentProvider selected={undefined} onSelect={() => {}}>
            <GetMeasurementProvider getCurrentMeasurement={() => undefined}>
              <Canvas
                components={example2}
                onUpdateComponentCoords={() => {}}
                onAddComponent={() => {}}
                onUpdateComponent={() => {}}
              />
            </GetMeasurementProvider>
          </SelectComponentProvider>
        </GetZoomCoefficientProvider>
      </div>
      <p>
        В этом случае Vout уже не может быть расcчитано лишь на основе значений Vin, R1 и R2: сама нагрузка провоцирует
        дополнительное падение напряжения (voltage drop). Пусть нагрузкой является нечто, что потребляет ток в 10 мА при
        предоставленных 5 В. Тогда её сопротивление
      </p>
      <p>
        <Latex>{"$R_L = \\frac{U}{I} = \\frac{5В}{0.01А} = 500 Ом$"}</Latex>
      </p>
      <p>
        В случае с подключенной нагрузкой следует рассматривать нижнюю часть делителя, как два резистора соединённых
        параллельно:
      </p>
      <p>
        <Latex>{"$R_{2L} = \\frac{1}{\\frac{1}{R_2} + \\frac{1}{R_L}} = 250 Ом$"}</Latex>
      </p>
      <p>Подставив значение в общую формулу расчёта Vout, получим:</p>
      <p>
        <Latex>
          {"$V_L = V_{in} \\frac{R_{2L}}{R_1 + R_{2L}} = 9В \\cdot \\frac{250 Ом}{400 Ом \\cdot 250 Ом} = 3.46 В$"}
        </Latex>
      </p>
      <p>
        Как видно, мы потеряли более полутора вольт напряжения из-за подключения нагрузки. И тем ощутимее будут потери,
        чем больше номинал R2 по отношению к сопротивлению L. Чтобы нивелировать этот эффект мы могли бы использовать в
        качестве R1 и R2 резисторы, например, в 10 раз меньших номиналов.
      </p>
      <div className="h-80 w-80">
        <GetZoomCoefficientProvider zoomCoefficient={48}>
          <SelectComponentProvider selected={undefined} onSelect={() => {}}>
            <GetMeasurementProvider getCurrentMeasurement={() => undefined}>
              <Canvas
                components={example2}
                onUpdateComponentCoords={() => {}}
                onAddComponent={() => {}}
                onUpdateComponent={() => {}}
              />
            </GetMeasurementProvider>
          </SelectComponentProvider>
        </GetZoomCoefficientProvider>
      </div>
      <p>Пропорция сохраняется, Vout не меняется:</p>
      <p>
        <Latex>{"$V_{out} = 9В \\cdot \\frac{50 Ом }{40 Ом + 50 Ом} = 5В$"}</Latex>
      </p>
      <p>А потери уменьшатся:</p>
      <p>
        <Latex>{"$R_{2L} = \\frac{1}{\\frac{1}{R_2} + \\frac{1}{R_L}} = 45.45 Ом$"}</Latex>
      </p>
      <p>
        <Latex>
          {"$V_L = V_{in} \\frac{R_{2L}}{R_1 + R_{2L}} = 9В \\cdot \\frac{45.45 Ом}{40 Ом \\cdot 45.45 Ом} = 4.79 В$"}
        </Latex>
      </p>
      <p>
        Однако, у снижения сопротивления делящих резисторов есть обратная сторона медали. Большое количество энергии от
        источника питания будет уходить в землю. В том числе при отсоединённой нагрузке. Это небольшая проблема, если
        устройство питается от сети, но — нерациональное расточительство в случае питания от батарейки.
      </p>
      <p>
        Кроме того, нужно помнить, что резисторы расчитаны на определённую предельную мощьность. В нашем случае нагрузка
        на R1 равна:
      </p>
      <p>
        <Latex>{"$P = \\frac{V_{in}^2}{R_1} = \\frac{9В \\cdot 9В}{40 Ом} \\approx 2 Вт$"}</Latex>
      </p>
      <p>
        А это в 4-8 раз выше максимальной мощности самых распространённых резисторов! Попытка воспользоваться описанной
        схемой со сниженными номиналами и стандартными 0.25 или 0.5 Вт резисторами ничем хорошим не закончится. Очень
        вероятно, что результатом будет возгарание.
      </p>
      <h1 className="mb-4 mt-4 text-3xl font-bold">Применимость</h1>
      <p>
        Делитель напряжения подходит для получения необходимого заниженного напряжения в случаях, когда подключенная
        нагрузка потребляет небольшой ток (доли или единицы миллиампер). Примером подходящего использования является
        считывание напряжения аналоговым входом микроконтроллера, управление базой/затвором транзистора.
      </p>
      <p>Делитель не подходит для подачи напряжения на мощных потребителей вроде моторов или светодиодных лент.</p>
      <p>
        Чем меньшие номиналы выбраны для делящих резисторов, тем больше энергии расходуется впустую и тем выше нагрузка
        на сами резисторы. Чем номиналы больше, тем больше и дополнительное (нежелательное) падение напряжения,
        провоцируемое самой нагрузкой.
      </p>
      <p>Если потребление тока нагрузкой неравномерно во времени, Vout также будет неравномерным.</p>
      <div className="h-40"></div>
    </div>
  );
}
