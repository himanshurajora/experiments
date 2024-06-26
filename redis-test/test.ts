const existing = [
  {
    id: 1344218,
    campaignId: 2232,
    screenId: 0,
    startDate: "2023-06-29",
    endDate: "2023-07-21",
    isExclusive: false,
    isArchived: false,
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: true,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    slotType: "dayPartingSlot",
    createdAt: "2023-07-24T14:00:25.342Z",
    updatedAt: "2023-07-24T14:00:25.342Z",
  },
  {
    id: 1344219,
    campaignId: 2232,
    screenId: 0,
    startDate: "2023-06-29",
    endDate: "2023-07-21",
    isExclusive: false,
    isArchived: false,
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    slotType: "dayPartingSlot",
    createdAt: "2023-07-24T14:00:25.342Z",
    updatedAt: "2023-07-24T14:00:25.342Z",
  },
  {
    id: 1344220,
    campaignId: 2232,
    screenId: 0,
    startDate: "2023-06-29",
    endDate: "2023-07-21",
    isExclusive: false,
    isArchived: false,
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: false,
    tuesday: true,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    slotType: "dayPartingSlot",
    createdAt: "2023-07-24T14:00:25.342Z",
    updatedAt: "2023-07-24T14:00:25.342Z",
  },
  {
    id: 1344221,
    campaignId: 2232,
    screenId: 0,
    startDate: "2023-06-29",
    endDate: "2023-07-21",
    isExclusive: false,
    isArchived: false,
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: true,
    thursday: false,
    friday: false,
    saturday: false,
    slotType: "dayPartingSlot",
    createdAt: "2023-07-24T14:00:25.342Z",
    updatedAt: "2023-07-24T14:00:25.342Z",
  },
  {
    id: 1344222,
    campaignId: 2232,
    screenId: 0,
    startDate: "2023-06-29",
    endDate: "2023-07-21",
    isExclusive: false,
    isArchived: false,
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: true,
    friday: false,
    saturday: false,
    slotType: "dayPartingSlot",
    createdAt: "2023-07-24T14:00:25.342Z",
    updatedAt: "2023-07-24T14:00:25.342Z",
  },
  {
    id: 1344223,
    campaignId: 2232,
    screenId: 0,
    startDate: "2023-06-29",
    endDate: "2023-07-21",
    isExclusive: false,
    isArchived: false,
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: true,
    saturday: false,
    slotType: "dayPartingSlot",
    createdAt: "2023-07-24T14:00:25.342Z",
    updatedAt: "2023-07-24T14:00:25.342Z",
  },
  {
    id: 1344224,
    campaignId: 2232,
    screenId: 0,
    startDate: "2023-06-29",
    endDate: "2023-07-21",
    isExclusive: false,
    isArchived: false,
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: true,
    slotType: "dayPartingSlot",
    createdAt: "2023-07-24T14:00:25.342Z",
    updatedAt: "2023-07-24T14:00:25.342Z",
  },
];

const latest = [
  {
    startDate: "2023-06-30",
    endDate: "2023-07-22",
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: true,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    isExclusive: false,
    screenId: 0,
  },
  {
    startDate: "2023-06-30",
    endDate: "2023-07-22",
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    isExclusive: false,
    screenId: 0,
  },
  {
    startDate: "2023-06-30",
    endDate: "2023-07-22",
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: false,
    tuesday: true,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    isExclusive: false,
    screenId: 0,
  },
  {
    startDate: "2023-06-30",
    endDate: "2023-07-22",
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: true,
    thursday: false,
    friday: false,
    saturday: false,
    isExclusive: false,
    screenId: 0,
  },
  {
    startDate: "2023-06-30",
    endDate: "2023-07-22",
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: true,
    friday: false,
    saturday: false,
    isExclusive: false,
    screenId: 0,
  },
  {
    startDate: "2023-06-30",
    endDate: "2023-07-22",
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: true,
    saturday: false,
    isExclusive: false,
    screenId: 0,
  },
  {
    startDate: "2023-06-30",
    endDate: "2023-07-22",
    startTime: "14:00:00",
    endTime: "16:59:59",
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: true,
    isExclusive: false,
    screenId: 0,
  },
];

let areSlotsSame = true;

latest.forEach((slot) => {
  const index = existing.findIndex((es) => {
    return (
      es.startDate === slot.startDate &&
      es.endDate === slot.endDate &&
      es.startTime === slot.startTime &&
      es.endTime === slot.endTime &&
      es.sunday === slot.sunday &&
      es.monday === slot.monday &&
      es.tuesday === slot.tuesday &&
      es.wednesday === slot.wednesday &&
      es.thursday === slot.thursday &&
      es.friday === slot.friday &&
      es.saturday === slot.saturday &&
      es.screenId === slot.screenId
    );
  });

  console.log(index);

  if (index > -1) {
    existing.splice(index, 1);
  }
});

console.log(existing.length);
if (existing.length < 1) {
  console.log("THE SLOTS ARE SAME");
} else {
  console.log("THE SLOTS ARE DIFFERENT");
}
