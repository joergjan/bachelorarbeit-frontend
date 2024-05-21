<script lang="ts">
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";
  import { Slider } from "$lib/components/ui/slider";
  import { skills } from "$lib/skills";

  let result: Number;
  let getPrediction: HTMLFormElement;

  async function SubmitForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    const data = JSON.parse(result.data);

    console.log(data);

    return data;
  }

  let abilities: Number[] = [];
</script>

<h1>Berufsfuturomat</h1>

<h3>
  Berechne die Wahrscheinlichkeit, mit der du durch Roboter ersetzt werden
  könntest
</h3>

<form
  action="?/predict"
  method="POST"
  use:enhance
  bind:this={getPrediction}
  on:submit|preventDefault={() => {}}
>
  <p>API Result: {result}</p>
  <ul class="space-y-5">
    {#each skills as skill, i}
      <li class="items-center justify-center">
        <h4>
          {skill.name}
        </h4>
        <p>
          {skill.description}
        </p>
        <input
          type="range"
          id={skill.id}
          name={skill.id}
          bind:value={skill.value}
          on:change={() => SubmitForm(getPrediction)}
        />
      </li>
    {/each}
  </ul>
</form>
