"use client";

import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";

// Configure Amplify immediately when the app boots
Amplify.configure(config, { ssr: true });

export default function ConfigureAmplify() {
  return null;
}
