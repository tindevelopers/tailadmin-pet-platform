"use client";

import { builder, Builder } from "@builder.io/react";
import AiLayout from "@/components/ai/AiLayout";

const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

if (!builderApiKey) {
  console.warn(
    "NEXT_PUBLIC_BUILDER_API_KEY is not set. Builder components will not be registered."
  );
} else {
  builder.init(builderApiKey);

  Builder.registerComponent(AiLayout, {
    name: "AI Layout",
    canHaveChildren: true,
  });
}
