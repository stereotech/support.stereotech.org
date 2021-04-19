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
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-autocomplete
                    :loading="loading"
                    :items="items"
                    item-text="title"
                    @change="select"
                    return-object
                    :search-input.sync="search"
                    cache-items
                    outlined
                    clearable
                    hide-no-data
                    hide-details
                    solo
                    :label="$t('Поиск')"
                  >
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

  search: string = ''
  loading: boolean = false
  items: IContentDocument[] = []

  @Watch('search') async onSearchChanged(value: string) {
    if (!value || value.length  < 3) {
      this.items = []
    }
    value && value.length >= 3 && await this.querySelections(value)
  }

  async querySelections(search: string) {
    this.loading = true

  this.items = await this.$content(`/user-manuals/${this.$i18n.locale}`, {deep: true}).where({extension: {$ne: 'json'}}&&{slug: {$ne: '!cover'}}).search(search).only(['title']).fetch() as IContentDocument[]

    this.loading = false
  }

  select(payload: IContentDocument){
    this.$router.push(this.localePath('/'+payload.path.split('/').slice(3).join('/')))
  }

  
  

}
</script>

<style>
</style>