import { runIdxImport, type IdxDataDriver, type IdxStorageDriver } from "../lib/idx/importer";

type CliOptions = {
  downloadPhotos?: boolean;
  includeRaw?: boolean;
  dryRun?: boolean;
  feeds?: string;
  storageDriver?: IdxStorageDriver;
  dataDriver?: IdxDataDriver;
};

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {};

  argv.forEach((arg) => {
    if (arg === "--no-photos") options.downloadPhotos = false;
    if (arg === "--include-raw") options.includeRaw = true;
    if (arg === "--dry-run") options.dryRun = true;
    if (arg.startsWith("--feeds=")) options.feeds = arg.replace("--feeds=", "");
    if (arg.startsWith("--storage=")) options.storageDriver = arg.replace("--storage=", "") as IdxStorageDriver;
    if (arg.startsWith("--data=")) options.dataDriver = arg.replace("--data=", "") as IdxDataDriver;
  });

  return options;
}

runIdxImport(parseArgs(process.argv.slice(2))).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
