"use client";

import React, { useEffect } from "react";

const TestEffect = () => {
  console.log("🟡 TestEffect mounted");
  useEffect(() => {
    console.log("🟢 TestEffect useEffect triggered");
  }, []);

  return <div>TestEffect works?</div>;
};

export default TestEffect;
