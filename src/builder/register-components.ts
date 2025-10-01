"use client";

import { builder, Builder } from "@builder.io/react";
import AiLayout from "@/components/ai/AiLayout";
import UserInfoCard from "@/components/user-profile/UserInfoCard";

const builderApiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

if (!builderApiKey) {
  console.warn(
    "NEXT_PUBLIC_BUILDER_API_KEY is not set. Builder components will not be registered."
  );
} else {
  console.info("Registering Builder components with key", builderApiKey);
  builder.init(builderApiKey);

  Builder.registerComponent(AiLayout, {
    name: "AI Layout",
    canHaveChildren: true,
  });

  Builder.registerComponent(UserInfoCard, {
    name: "User Info Card",
  });

  console.info(
    "Registered components:",
    Builder.components.map((component) => component.name)
  );
}
