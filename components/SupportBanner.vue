<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-img
          :src="require('~/static/series5_banner.jpg?webp')"
          class="white--text align-center text-center"
          :gradient="'to bottom, rgba(2,119,189,0), rgba(2, 119, 189, 0.8), rgba(2,119,189,0)'"
        >
          <h4 class="display-1 font-weight-light">
            {{ title }}
          </h4>
          <v-form v-if="searchable">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                    :loading="loading"
                    :items="items"
                    item-text="title"
                    item-value="path"
                    return-object
                    :search-input.sync="search"                   
                    outlined
                    clearable
                    hide-no-data
                    hide-details
                    solo
                    :label="$t('Поиск')"
                  >
                    <template v-slot:item="{ item }">
                      <v-list-item
                        v-if="item"
                        nuxt
                        :to="localePath(createLink(item.path))"
                      >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          $t(item.dir)
                        }}</v-list-item-subtitle>
                      </v-list-item>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { IContentDocument } from "~/node_modules/@nuxt/content/types/content";

@Component
export default class SupportBanner extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({type: Boolean, default: false}) searchable!: boolean

  search: string = ''
  loading: boolean = false
  items: IContentDocument[] = []

  @Watch('search') async onSearchChanged (value: string) {
    if (!value || value.length < 3) {
      this.items = []
    }
    value && value.length >= 3 && await this.querySelections(value)
  }

  async querySelections (search: string) {
    this.loading = true

    this.items = await this.$content(`user-manuals/${this.$i18n.locale}`, { deep: true }).where({ extension: { $ne: 'json' } } && { slug: { $ne: '!cover' } }).search(search).without(['body']).fetch() as IContentDocument[]
    this.items.forEach(i => {
      i.dir = i.dir.split('/').pop() || ''
    })
    this.loading = false
  }



  createLink (link: string) {
    return '/' + link.split('/').slice(3).join('/')
  }




}
</script>

<style>
</style>