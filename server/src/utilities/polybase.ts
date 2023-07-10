import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace:
    "pk/0x2a32d59f3945ebf27efd41d8e9d71e3ab2cfbec19519eaf941ed4788be266f92d637233137ac5397a227e5e004948aa33c952fdd9e13e9236455c2514748003e/the-riot-protocol",
});

export default db;
