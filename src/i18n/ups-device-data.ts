/** Stable IDs for lookup in ups-calculator locale dictionaries (labels per locale). */

export const UPS_DEVICE_CATEGORY_ORDER = [
  "home",
  "lighting",
  "computer_it",
  "network",
  "security",
  "medical",
] as const;

export type UpsCategoryId = (typeof UPS_DEVICE_CATEGORY_ORDER)[number];

export type UpsDeviceRow = { id: string; watt: number };

export const UPS_DEVICES_BY_CATEGORY: Record<UpsCategoryId, UpsDeviceRow[]> = {
  home: [
    { id: "fridge", watt: 150 },
    { id: "fridge_freezer", watt: 200 },
    { id: "tv", watt: 100 },
    { id: "evap_cooler", watt: 200 },
    { id: "ac", watt: 1500 },
    { id: "fan", watt: 60 },
    { id: "washer", watt: 2000 },
    { id: "dishwasher", watt: 1800 },
    { id: "vacuum", watt: 1500 },
    { id: "water_heater", watt: 2000 },
    { id: "electric_stove", watt: 2000 },
    { id: "microwave", watt: 1200 },
    { id: "oven_toaster", watt: 1200 },
    { id: "kettle", watt: 2000 },
    { id: "tea_maker", watt: 800 },
    { id: "printer", watt: 40 },
    { id: "iron", watt: 2200 },
    { id: "hair_dryer", watt: 1800 },
  ],
  lighting: [
    { id: "led_bulb", watt: 10 },
    { id: "fluorescent", watt: 25 },
    { id: "halogen", watt: 50 },
    { id: "emergency_lamp", watt: 15 },
    { id: "led_flood", watt: 30 },
  ],
  computer_it: [
    { id: "pc_desktop", watt: 250 },
    { id: "laptop", watt: 65 },
    { id: "monitor_24", watt: 35 },
    { id: "monitor_27", watt: 45 },
    { id: "rack_server", watt: 500 },
    { id: "workstation", watt: 400 },
    { id: "laser_printer", watt: 400 },
    { id: "inkjet_printer", watt: 30 },
  ],
  network: [
    { id: "modem_router", watt: 15 },
    { id: "switch_8", watt: 20 },
    { id: "switch_24", watt: 50 },
    { id: "access_point", watt: 15 },
    { id: "nas", watt: 30 },
    { id: "firewall", watt: 40 },
    { id: "voip_phone", watt: 7 },
    { id: "pbx", watt: 60 },
  ],
  security: [
    { id: "cctv_cam", watt: 15 },
    { id: "dvr", watt: 30 },
    { id: "nvr", watt: 40 },
    { id: "access_control", watt: 20 },
  ],
  medical: [
    { id: "ventilator", watt: 150 },
    { id: "oxygen_concentrator", watt: 300 },
    { id: "cpap", watt: 30 },
    { id: "patient_monitor", watt: 50 },
  ],
};
