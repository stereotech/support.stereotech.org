<template>
  <v-card>
    <SupportBanner :title="$tc(`${bannerData.title}`)" />
    <v-list v-if="searchContent.length">
      <v-list-item v-for="s in searchContent" :key="s.slug">
        <v-list-item-title>
          {{ s.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
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
    <v-card-text>
      <v-container fluid>
        <v-row justify="center">
          <v-col
            v-for="(manual, index) in covers"
            :key="index"
            cols="12"
            :md="covers.length>1?'4':'12'"
          >
            <v-list>
              <v-list-item
                :to="localePath(`/${$route.params.category}/${manual.link}`)"
                nuxt
              >
                <v-list-item-title class="text-center font-weight-bold">{{
                  manual.title
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-for="(child, i) in manual.children"
                :key="i"
                :to="
                  localePath(
                    `/${$route.params.category}/${getSectionPath(child.path)}`
                  )
                "
                nuxt
              >
                <v-list-item-title
                  v-text="child.title"
                  class="text-center"
                ></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Vue, Component } from "nuxt-property-decorator";
import SupportBanner from "~/components/SupportBanner.vue"
import { IContentDocument } from "~/node_modules/@nuxt/content/types/content";

@Component({
  components: {
    SupportBanner
  }
})
export default class Category extends Vue {

  get getBreadcrumbsItems () {
    return [
      {
        text: this.$t('Поддержка'), disabled: false, exact: true, nuxt: true, to: '/'
      },
      {
        text: this.bannerData.title, disabled: true, exact: true, nuxt: true, to: this.$route.fullPath
      }]
  }

  content: IContentDocument | IContentDocument[] = []

  searchContent: IContentDocument | IContentDocument[] = []

  covers: { title: string, link: string, children: IContentDocument[] }[] = []

  bannerData: IContentDocument = { dir: '', path: '', extension: '', slug: '', createdAt: new Date(), updatedAt: new Date() }

  private getSectionPath (arr: string): string {
    return arr.split('/').slice(-2).join('/')
  }

  private section (arr: string[]) {
    return arr[arr.length - 2]
  }

  async onSearch (data: string) {
    if (!data) {
      this.searchContent = []
    }
    console.log(data)
    this.searchContent = await this.$content(`user-manuals/${this.$i18n.locale}/${this.$route.params.category}`, { deep: true }).search(data).fetch()
  }

  async mounted () {

    // this.content = await this.$content(`user-manuals/${this.$i18n.locale}/${this.$route.params.category}`, { deep: true }).without('body').fetch()
    // this.bannerData = this.content.find((i: IContentDocument) => i.extension === '.json' && i.slug === 'home')
    // this.covers = this.content.filter((i: IContentDocument) => i.slug === '!cover').map((v: IContentDocument) => { return { title: v.title, link: v.path.split('/').slice(-2)[0], children: this.content.filter((c: IContentDocument) => c.dir == v.dir && c.slug !== '!cover') } })
  }

  async asyncData (ctx: Context) {
    const content = await ctx.$content(`user-manuals/${ctx.i18n.locale}/${ctx.route.params.category}`, { deep: true }).without('body').fetch()
    const bannerData = content.find((i: IContentDocument) => i.extension === '.json' && i.slug === 'home')
    const covers = content.filter((i: IContentDocument) => i.slug === '!cover').map((v: IContentDocument) => { return { title: v.title, link: v.path.split('/').slice(-2)[0], children: content.filter((c: IContentDocument) => c.dir == v.dir && c.slug !== '!cover') } })
    return {
      content,
      bannerData,
      covers
    }

  }

}
</script>

<style>
</style>