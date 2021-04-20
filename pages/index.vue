<template>
  <v-card>
    <SupportBanner
      :title="this.$tc('Руководства пользователя')"
      :searchable="true"
    />
    <v-card-text>
      <v-container fluid>
        <v-row justify="center">
          <v-col
            v-for="(category, index) in categories"
            :key="index"
            cols="12"
            md="4"
          >
            <v-card
              :to="localePath(`/${categoryPath(category.path.split('/'))}`)"
              nuxt
            >
              <v-card-title>{{ category.title }}</v-card-title>
              <v-card-text>
                <v-img :src="category.image"></v-img>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-col cols="12">
          <MoreInfo />
        </v-col>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { IContentDocument } from "@nuxt/content/types/content";
import { Context } from '@nuxt/types';
import { Vue, Component } from "nuxt-property-decorator";
import SupportBanner from "~/components/SupportBanner.vue"
import MoreInfo from "~/components/MoreInfo.vue"

@Component({
  components: {
    SupportBanner
  }
})
export default class Support extends Vue {

  private categoryPath (arr: any[]) {
    return arr[arr.length - 2]
  }

  categories: IContentDocument | IContentDocument[] = []

  async mounted () {
    //this.categories = await this.$content(`user-manuals/${this.$i18n.locale}`, { deep: true }).where({ extension: '.json' }).fetch()
  }

  async asyncData (ctx: Context) {
    const categories = await ctx.$content(`user-manuals/${ctx.i18n.locale}`, { deep: true }).where({ extension: '.json' }).fetch()
    return {
      categories
    }
  }
}
</script>

<style>
</style>