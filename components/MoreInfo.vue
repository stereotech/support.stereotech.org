<template>
  <v-card>
    <v-row justify="center">
      <v-col cols="12">
          <h2 class="text-center">{{$t('Больше информации')}}</h2>
      </v-col>
    </v-row> 
  </v-card>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class MoreInfo extends Vue{

}
</script>

<style>

</style>