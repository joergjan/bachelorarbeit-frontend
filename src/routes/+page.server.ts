import type { Actions, PageServerLoad } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";

import pkg from "onnxjs";
const { Tensor, InferenceSession } = pkg;

export const actions: Actions = {
  predict: async ({ request, params }) => {
    const formData = Object.fromEntries(await request.formData());

    const a12 = formData.a12;
    const s4 = formData.s4;
    const s27 = formData.s27;
    const s15 = formData.s15;
    const s8 = formData.s8;
    const s31 = formData.s31;
    const s26 = formData.s26;
    const s24 = formData.a12;

    const inputs = [a12, s4, s27, s15, s8, s31, s26, s24];
    const float32Inputs = [
      new Tensor(new Float32Array(inputs.map(Number)), "float32"),
    ];

    console.log(float32Inputs);

    try {
      const session = new InferenceSession();
      await session.loadModel("https://ba.jan-joerg.ch/predict/model.onnx");

      console.log("worked");

      // run this in an async method:
      const outputMap = await session.run(float32Inputs);
      const outputTensor = outputMap.values().next().value;

      console.log(outputTensor);

      return {
        prediction: outputTensor,
      };
    } catch (e) {
      console.error(e);
      return {
        status: 500,
        body: {
          message: `failed to inference ONNX model: ${e}.`,
        },
      };
    }
  },
};
