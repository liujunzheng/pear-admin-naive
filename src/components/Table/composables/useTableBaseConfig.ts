import { ComputedRef, ref, watch } from 'vue'
import { DEFAULT_TABLE_HEIGHT, DEFAULT_TABLE_SIZE } from '@/config'

import { TableBaseColumn } from 'naive-ui/es/data-table/src/interface'

export interface PTableColumns extends TableBaseColumn {
  visible: boolean
}

export const NOT_RENDER_KEYS = ['expand', 'selection']

export interface TableConfigOptions {
  attrs: Record<string, any>
}

export type TableSize = 'small' | 'medium' | 'large'

export function useTableBaseConfig(options: ComputedRef<TableConfigOptions>) {
  // table size
  const sizeRef = ref<TableSize>(DEFAULT_TABLE_SIZE)

  // table height
  const heightRef = ref<number>(DEFAULT_TABLE_HEIGHT)

  // icon size
  const iconSizeRef = ref<number>(18)

  // columns
  const columns = ref<PTableColumns[]>([])

  watch(
    options,
    (o) => {
      if (o.attrs.size) {
        // 可以是最外层table设置的size值
        sizeRef.value = o.attrs.size
      }
      if (o.attrs.height) {
        heightRef.value = o.attrs.height
      }
      if (o.attrs.columns) {
        columns.value = o.attrs.columns.map((col) => ({ ...col, visible: true }))
      }
    },
    { immediate: true }
  )

  return {
    tableSize: sizeRef,
    tableHeight: heightRef,
    iconSize: iconSizeRef,
    columns
  }
}