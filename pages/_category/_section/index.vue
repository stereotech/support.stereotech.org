<template>
  <v-container>
    <v-card>
      <v-card-title v-if="$vuetify.breakpoint.xs">
        <v-breadcrumbs divider=">" :items="getBreadcrumbsItems"></v-breadcrumbs>
      </v-card-title>
      <v-card-title v-else>
        <v-breadcrumbs
          large
          divider=">"
          :items="getBreadcrumbsItems"
        ></v-breadcrumbs>
      </v-card-title>
      <v-row justify="center">
        <v-col cols="12">
          <h2 class="text-center">{{ mainFile.title }}</h2>
        </v-col>
        <v-col cols="12" sm="4" v-for="(item, index) in subFiles" :key="index">
          <v-list>
            <v-list-item>
              <v-list-item-title class="text-center font-weight-bold">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="header of item.toc"
              :key="header.id"
              :to="`/${$route.params.category}/${$route.params.section}/${item.slug}#${header.id}`"
              nuxt
            >
              <v-list-item-title
                v-text="header.text"
                class="text-center"
              ></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from "nuxt-property-decorator";
import { IContentDocument } from "~/node_modules/@nuxt/content/types/content";

@Component
export default class ManualCategory extends Vue {

  get getBreadcrumbsItems () {
    return [
      {
        text: this.$t('Поддержка'), disabled: false, exact: true, nuxt: true, to: '/'
      },
      {
        text: this.categoryText, disabled: false, exact: true, nuxt: true, to: `/${this.$route.params.category}`
      },
      {
        text: this.mainFile.title, disabled: true, exact: true, nuxt: true, to: this.$route.fullPath
      }]
  }
  category: IContentDocument[] = []
  categoryText: string = ''
  sectionFiles: IContentDocument | IContentDocument[] = []

  subFiles: { title: string, link: string, children: IContentDocument[] }[] = []

  mainFile: IContentDocument = { dir: '', path: '', extension: '', slug: '', createdAt: new Date(), updatedAt: new Date() }

  async mounted () {
    // this.sectionFiles = await this.$content(`/user-manuals/${this.$i18n.locale}/${this.$route.params.category}/${this.$route.params.section}`, { deep: true }).without('body').fetch()
    // this.mainFile = this.sectionFiles.find((i: { slug: string; }) => i.slug === '!cover')
    // this.subFiles = this.sectionFiles.filter((i: { slug: string; }) => i.slug !== '!cover')
    // this.sectionFiles.forEach((el: { toc: any[]; }) => this.$fixIds(el.toc))
    // this.category = await this.$content(`user-manuals/${this.$i18n.locale}/${this.$route.params.category}`).where({ extension: '.json' }).only(['title']).fetch() as IContentDocument[]
    // this.categoryText = this.category[0].title
    // console.log(this.category[0].title)
  }

  async asyncData (ctx: Context) {
    const sectionFiles = await ctx.$content(`user-manuals/${ctx.i18n.locale}/${ctx.route.params.category}/${ctx.route.params.section}`, { deep: true }).without('body').fetch()
    const mainFile = sectionFiles.find((i: { slug: string; }) => i.slug === '!cover')
    const subFiles = sectionFiles.filter((i: { slug: string; }) => i.slug !== '!cover')
    sectionFiles.forEach((el: { toc: any[]; }) => ctx.app.$fixIds(el.toc))
    const category = await ctx.$content(`user-manuals/${ctx.i18n.locale}/${ctx.route.params.category}`).where({ extension: '.json' }).only(['title']).fetch() as IContentDocument[]
    const categoryText = category[0].title
    return {
      sectionFiles,
      mainFile,
      subFiles,
      category,
      categoryText
    }
  }
}
</script>

<style>
</style>