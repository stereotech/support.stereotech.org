import {slugify} from 'transliteration'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
    interface Vue {
        $fixIds (elements: any[]): void
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $fixIds (elements: any[]): void
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $fixIds (elements: any[]): void
    }
}

const fixIdsPlugin: Plugin = ({ store, redirect, route, app }, inject) => {
    inject('fixIds', (elements: any[]) => {
        elements.forEach((el) => {
            if (el.props && el.props.id) {
              el.props.id = slugify(el.props.id)
            }
            if (el.id) {
              el.id = slugify(el.id)
            }
            if (el.children) {
              app.$fixIds(el.children)
            }
          })
    })
}

export default fixIdsPlugin

