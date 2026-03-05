import {postType} from './postType'
import {authorType} from './authorType'
import {categoryType} from './categoryType'
import {blockContentType} from './blockContentType'
import {heroType} from './heroType'
import {siteSettingsType} from './siteSettingsType'

export const schema = {
  types: [postType, authorType, categoryType, blockContentType, heroType, siteSettingsType],
}