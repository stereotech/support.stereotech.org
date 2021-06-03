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
                    outlined
                    clearable
                    hide-no-data
                    hide-details
                    solo
                    :label="$t('Поиск')"
                  >
                    <template v-slot:item="{ item, on, attrs }">
                      <v-list-item
                      v-on="on"
                      v-bind="attrs"
                        v-if="item"
                        nuxt
                        :to="localePath(createLink(item.path))"
                      >
                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          createSubtitle(item.dir)
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
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

  loading: boolean = false
  items: IContentDocument[] = []

  createLink (link: string) {
    return '/' + link.split('/').slice(3).join('/')
  }

  createSubtitle (dir: string){
    let dirParts = dir.split('/').slice(-2)
    return this.$t(`${dirParts[0]}`)+ ' -> ' + this.$t(`${dirParts[1]}`)
  }

async mounted(){
  this.items = await this.$content(`user-manuals/${this.$i18n.locale}`, { deep: true }).where({ extension: { $ne: '.json' } } && { slug: { $nin: ['!cover', 'home'] } }).without(['body']).fetch() as IContentDocument[]
  console.log(this.items)
}


}
</script>

<style>
</style>