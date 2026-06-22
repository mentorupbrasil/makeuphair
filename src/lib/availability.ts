function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(total: number) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export function generateTimeSlots(
  horaInicio: string,
  horaFim: string,
  intervaloMin: number,
  duracaoMin: number
) {
  const slots: string[] = [];
  let current = toMinutes(horaInicio);
  const end = toMinutes(horaFim);

  while (current + duracaoMin <= end) {
    slots.push(fromMinutes(current));
    current += duracaoMin + intervaloMin;
  }

  return slots;
}

export function filterOccupiedSlots(
  slots: string[],
  occupied: { horaInicio: string; horaFim: string }[],
  duracaoMin: number
) {
  return slots.filter((slot) => {
    const start = toMinutes(slot);
    const end = start + duracaoMin;
    return !occupied.some((o) => {
      const oStart = toMinutes(o.horaInicio);
      const oEnd = toMinutes(o.horaFim);
      return start < oEnd && end > oStart;
    });
  });
}
