<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="3">
        <ManualSideNav class="sideNavPos" :manualHeaders="page.toc" />
      </v-col>
      <v-col cols="12" sm="9">
        <v-card>
          <v-card-title v-if="$vuetify.breakpoint.xs">
            <v-breadcrumbs
              divider=">"
              :items="getBreadcrumbsItems"
            ></v-breadcrumbs>
          </v-card-title>
          <v-card-title v-else>
            <v-breadcrumbs
              large
              divider=">"
              :items="getBreadcrumbsItems"
            ></v-breadcrumbs>
          </v-card-title>
          <v-container fluid>
            <nuxt-content :document="page" />
            <v-row justify="center">
              <v-col cols="12" sm="6">
                <v-btn
                  color="primary"
                  v-if="prevNext[0]"
                  :to="
                    localePath(
                      `/${this.$route.params.category}/${this.$route.params.section}/${prevNext[0].slug}`
                    )
                  "
                  nuxt
                >
                  <v-icon right>mdi-chevron-left</v-icon>
                  {{ prevNext[0].title }}
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="6" align-self="end">
                <v-btn
                  class="float-sm-right"
                  color="primary"
                  v-if="prevNext[1]"
                  :to="
                    localePath(
                      `/${this.$route.params.category}/${this.$route.params.section}/${prevNext[1].slug}`
                    )
                  "
                  nuxt
                >
                  {{ prevNext[1].title }}
                  <v-icon right>mdi-chevron-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { IContentDocument } from "@nuxt/content/types/content";
import ManualSideNav from "~/components/ManualSideNav.vue"
import { Context } from '@nuxt/types';

@Component({
  components: {
    ManualSideNav
  }
})
export default class Section extends Vue {

  get getBreadcrumbsItems () {
    return [
      {
        text: this.$t('Поддержка'), disabled: false, exact: true, nuxt: true, to: '/'
      },
      {
        text: this.categoryText, disabled: false, exact: true, nuxt: true, to: `/${this.$route.params.category}`
      },
      {
        text: this.mainFileText, disabled: false, exact: true, nuxt: true, to: `/${this.$route.params.category}/${this.$route.params.section}`
      },
      {
        text: this.fileTitle.title, disabled: false, exact: true, nuxt: true, to: this.$route.fullPath
      }]
  }
  category: IContentDocument[] = []
  categoryText: string = ''
  sectionFiles: IContentDocument | IContentDocument[] = []
  mainFileText: string = ''
  page: IContentDocument | IContentDocument[] = []
  fileTitle: any = {}
  prevNext: IContentDocument | IContentDocument[] = []

  async mounted () {
    
    // this.page = await this.$content(`/user-manuals/${this.$i18n.locale}/${this.$route.params.category}/${this.$route.params.section}/${this.$route.params.file}`, { deep: true }).fetch() as IContentDocument
    // this.$fixIds(this.page.body.children)
    // this.$fixIds(this.page.toc)
    // this.fileTitle = await this.$content(`/user-manuals/${this.$i18n.locale}/${this.$route.params.category}/${this.$route.params.section}/${this.$route.params.file}`).only(['title']).fetch()
    // this.prevNext = await this.$content(`/user-manuals/${this.$i18n.locale}/${this.$route.params.category}/${this.$route.params.section}`, { deep: true }).only(['title', 'slug']).where({ slug: { $ne: '!cover' } }).surround(this.$route.params.file).fetch()
    // this.category = await this.$content(`user-manuals/${this.$i18n.locale}/${this.$route.params.category}`).where({ extension: '.json' }).only(['title']).fetch() as IContentDocument[]
    // this.categoryText = this.category[0].title
    // this.sectionFiles = await this.$content(`/user-manuals/${this.$i18n.locale}/${this.$route.params.category}/${this.$route.params.section}`, { deep: true }).without('body').fetch()
    // this.mainFileText = this.sectionFiles.find((i: { slug: string; }) => i.slug === '!cover').title
  }

  async asyncData (ctx: Context) {
    const page = await ctx.$content(`user-manuals/${ctx.i18n.locale}/${ctx.route.params.category}/${ctx.route.params.section}/${ctx.route.params.file}`, { deep: true }).fetch() as IContentDocument
    ctx.app.$fixIds(page.body.children)
    ctx.app.$fixIds(page.toc)    
    const fileTitle = await ctx.$content(`user-manuals/${ctx.i18n.locale}/${ctx.route.params.category}/${ctx.route.params.section}/${ctx.route.params.file}`).only(['title']).fetch()
    const prevNext = await ctx.$content(`user-manuals/${ctx.i18n.locale}/${ctx.route.params.category}/${ctx.route.params.section}`, { deep: true }).only(['title', 'slug']).where({ slug: { $ne: '!cover' } }).surround(ctx.route.params.file).fetch()
    const category = await ctx.$content(`user-manuals/${ctx.i18n.locale}/${ctx.route.params.category}`).where({ extension: '.json' }).only(['title']).fetch() as IContentDocument[]
    const categoryText = category[0].title
    const sectionFiles = await ctx.$content(`user-manuals/${ctx.i18n.locale}/${ctx.route.params.category}/${ctx.route.params.section}`, { deep: true }).without('body').fetch()
    const mainFileText = sectionFiles.find((i: { slug: string; }) => i.slug === '!cover').title
    
    return {
      page,
      fileTitle,
      prevNext,
      category,
      categoryText,
      sectionFiles,
      mainFileText
    }
  }
}
</script>

<style>
.sideNavPos {
  position: sticky;
  top: 10%;
}
.nuxt-content h1 {
  font-size: 6rem !important;
  line-height: 6rem;
  letter-spacing: -0.015625em !important;
  font-weight: 300;
  font-family: Roboto, sans-serif !important;
}
.nuxt-content h2 {
  font-size: 1.75rem !important;
  line-height: 1.75rem;
  letter-spacing: -0.0083333333em !important;
  font-weight: 400;
  font-family: Roboto, sans-serif !important;
}
.nuxt-content h3 {
  font-size: 1.4rem !important;
  line-height: 1.4rem;
  letter-spacing: -0.0083333333em !important;
  font-weight: 400;
  font-family: Roboto, sans-serif !important;
  margin-top: 6px;
  margin-bottom: 8px;
}
.nuxt-content img {
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  box-sizing: inherit;
  background-repeat: no-repeat;
  padding: 0;
  margin: 0;
  z-index: 0;
  position: relative;
  overflow: hidden;
  flex: 1 0 auto;
  max-width: 100%;
  max-height: 480px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.nuxt-content p {
  word-break: normal;
  tab-size: 4;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  background-repeat: no-repeat;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  margin-bottom: 16px;
}
.nuxt-content ol {
  word-break: normal;
  tab-size: 4;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  background-repeat: no-repeat;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  padding-left: 24px;
}
.nuxt-content li {
  word-break: normal;
  tab-size: 4;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  background-repeat: no-repeat;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
.nuxt-content ul {
  word-break: normal;
  tab-size: 4;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  background-repeat: no-repeat;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  padding-left: 24px;
}
.nuxt-content blockquote {
  word-break: normal;
  tab-size: 4;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  background-repeat: no-repeat;
  box-sizing: inherit;
  margin: 0;
  display: block;
  font-size: 16px;
  margin-bottom: 16px;
  padding: 16px;
  position: relative;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  color: #fff;
  background-color: #9c27b0 !important;
  border-color: #9c27b0 !important;
  border-radius: 4px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.14),
    0 0 0 0 rgba(0, 0, 0, 0.12);
}
.nuxt-content blockquote p {
  word-break: normal;
  tab-size: 4;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  font-size: 16px;
  color: #fff;
  background-repeat: no-repeat;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  flex: 1 1 auto;
}
.nuxt-content table {
  word-break: normal;
  tab-size: 4;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  background-repeat: no-repeat;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
  width: 100%;
  border-spacing: 0;
}
.nuxt-content thead {
  word-break: normal;
  tab-size: 4;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  border-spacing: 0;
  background-repeat: no-repeat;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
.nuxt-content thead tr {
  word-break: normal;
  tab-size: 4;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  border-spacing: 0;
  background-repeat: no-repeat;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
.nuxt-content th {
  word-break: normal;
  tab-size: 4;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  border-spacing: 0;
  background-repeat: no-repeat;
  box-sizing: inherit;
  margin: 0;
  padding: 0 16px;
  user-select: none;
  font-size: 12px;
  height: 48px;
  text-align: left;
  color: rgba(0, 0, 0, 0.54);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.nuxt-content tbody {
  word-break: normal;
  tab-size: 4;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  border-spacing: 0;
  background-repeat: no-repeat;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
.nuxt-content tbody tr {
  word-break: normal;
  tab-size: 4;
  font-size: 16px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  border-spacing: 0;
  background-repeat: no-repeat;
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
.nuxt-content tbody td {
  word-break: normal;
  tab-size: 4;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  white-space: normal;
  color: rgba(0, 0, 0, 0.87);
  border-spacing: 0;
  background-repeat: no-repeat;
  box-sizing: inherit;
  margin: 0;
  padding: 0 16px;
  font-size: 14px;
  height: 48px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>