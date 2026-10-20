<script setup>
import comparison from "../../data/comparison.js";
</script>

<template>
  <h3 v-reveal class="subhead" style="margin-bottom: 20px">Comparing the seven works</h3>
  <div v-reveal class="table-wrap" tabindex="0" role="region" aria-label="Comparison of the seven works">
    <table>
      <thead>
        <tr><th v-for="h in comparison.head" :key="h" scope="col">{{ h }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="[work, ...cells] in comparison.rows" :key="work">
          <th scope="row">{{ work }}</th>
          <td v-for="(cell, i) in cells" :key="i" :data-label="comparison.head[i + 1]">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
