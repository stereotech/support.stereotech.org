<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" v-if="$vuetify.breakpoint.xs">
        <v-breadcrumbs divider=">" :items="getBreadcrumbsItems"></v-breadcrumbs>
      </v-col>
      <v-col cols="12" v-else>
        <v-breadcrumbs large divider=">" :items="getBreadcrumbsItems"></v-breadcrumbs>
      </v-col>
      <v-col lg="8">
        <ContactForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from 'nuxt-property-decorator'
import ContactForm from '~/components/ContactForm.vue'

@Component({
  head: {
    title: 'Техническая поддержка'
  },
  components: {
    ContactForm
  }
})
export default class Support extends Vue {

  get getBreadcrumbsItems(){
    return [
      {
        text: this.$t('Поддержка'), disabled: false, exact: true, nuxt: true, to: '/'
      },
      {
        text: this.$t('Сзязаться с нами'), disabled: true, exact: true, nuxt: true, to: this.$route.fullPath
      }
    ]
  }

  async mounted () {
    //@ts-ignore
    //await this.$recaptcha.init()
  }

  async asyncData(ctx: Context){
    //@ts-ignore
    //await ctx.$recaptcha.init()
  }
}

</script>

<style>
</style>