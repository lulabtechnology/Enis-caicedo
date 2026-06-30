import type { IdxProperty, IdxRawRecord } from "./types";

export type IdxAgentInfo = {
  code: string;
  name?: string;
  phone?: string;
  email?: string;
};

const agentFieldCandidates = {
  code: [
    "agent_id",
    "agent_code",
    "agt_id",
    "agt_code",
    "member_id",
    "member_number",
    "user_id",
    "unique_id",
    "id",
    "codigo_agente",
    "id_agente",
    "agente_id"
  ],
  name: [
    "agent_name",
    "agent_full_name",
    "full_name",
    "name",
    "nombre",
    "nombre_agente",
    "agente",
    "first_name_last_name"
  ],
  firstName: ["first_name", "firstname", "nombre", "primer_nombre"],
  lastName: ["last_name", "lastname", "apellido", "apellidos"],
  phone: ["phone", "mobile", "cell", "cell_phone", "agent_phone", "telefono", "celular"],
  email: ["email", "agent_email", "correo", "correo_electronico"]
} satisfies Record<string, string[]>;

function normalizeKey(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function clean(value?: string | number | null): string {
  return String(value ?? "").trim();
}

function keyMap(record: IdxRawRecord): Map<string, string> {
  const map = new Map<string, string>();
  Object.keys(record).forEach((key) => map.set(normalizeKey(key), key));
  return map;
}

function read(record: IdxRawRecord, map: Map<string, string>, candidates: string[]): string {
  for (const candidate of candidates) {
    const realKey = map.get(normalizeKey(candidate));
    const value = realKey ? clean(record[realKey]) : "";
    if (value) return value;
  }

  return "";
}

function agentName(record: IdxRawRecord, map: Map<string, string>): string {
  const direct = read(record, map, agentFieldCandidates.name);
  if (direct) return direct;

  return [
    read(record, map, agentFieldCandidates.firstName),
    read(record, map, agentFieldCandidates.lastName)
  ].filter(Boolean).join(" ").trim();
}

export function buildIdxAgentLookup(records: IdxRawRecord[]): Map<string, IdxAgentInfo> {
  const lookup = new Map<string, IdxAgentInfo>();

  for (const record of records) {
    const map = keyMap(record);
    const code = read(record, map, agentFieldCandidates.code);
    if (!code) continue;

    lookup.set(code, {
      code,
      name: agentName(record, map) || undefined,
      phone: read(record, map, agentFieldCandidates.phone) || undefined,
      email: read(record, map, agentFieldCandidates.email) || undefined
    });
  }

  return lookup;
}

export function enrichIdxPropertiesWithAgents(properties: IdxProperty[], agents: Map<string, IdxAgentInfo>): void {
  if (!agents.size) return;

  for (const property of properties) {
    const agentCode = clean(property.listingAgentCode);
    if (!agentCode) continue;

    const agent = agents.get(agentCode);
    if (!agent) continue;

    property.listingAgentName = property.listingAgentName || agent.name;
    property.listingAgentPhone = property.listingAgentPhone || agent.phone;
    property.listingAgentEmail = property.listingAgentEmail || agent.email;
  }
}
