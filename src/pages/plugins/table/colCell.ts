import { TableColCell, GuiIcon, BaseEvent, S2Event } from '@antv/s2'

export class CustomTableColCell extends TableColCell {
  onIconClick
  constructor(meta: any, spreadsheet: any, headerConfig: any, callback: any) {
    super(meta, spreadsheet, headerConfig)
    this.onIconClick = callback
  }

  protected drawTextShape(): void {
    super.drawTextShape()
    const { x, y, width: cellWidth, height: cellHeight } = this.meta
    const style = this.getStyle()
    const iconSize = style?.icon?.size || 12
    const iconMargin = style?.icon?.margin
    const { top = 0, right = 0, bottom = 0, left = 0 } = iconMargin || {}

    const iconX = x + cellWidth - iconSize - right * 2
    const iconY = y + cellHeight / 2 - iconSize / 2

    const iconBgX = iconX - left
    const iconBgY = iconY - top
    const iconBgWidth = iconSize + left + right
    const iconBgHeight = iconSize + top + bottom

    this.renderFilterIconBg({
      x: iconBgX,
      y: iconBgY,
      width: iconBgWidth,
      height: iconBgHeight,
    })
    this.renderFilterIcon({
      x: iconX,
      y: iconY,
      width: iconSize,
      height: iconSize,
    })
  }

  renderFilterIconBg({ x, y, width, height }: Record<'x' | 'y' | 'width' | 'height', number>) {
    const iconBg = this.addShape('rect', {
      attrs: {
        name: 'iconBg',
        x,
        y,
        width: width,
        height: height,
        fill: '#eff1f5',
        opacity: 0,
        lineWidth: 1,
        radius: 4,
        cursor: "pointer"
      },
    })
    this.add(iconBg)
    iconBg.set('name', 'iconBg')
    iconBg.on('mouseover', () => {
      iconBg.attr().opacity = 1
    })
    const bBox = iconBg.getBBox()
    const { x: boxX, y: boxY, width: boxW, height: boxH } = bBox
    iconBg.on('mouseleave', (e: MouseEvent) => {
      const { x, y } = e
      const isOut = x < boxX || y < boxY || x > boxX + boxW || y > boxY + boxH
      if (isOut) {
        iconBg.attr().opacity = 0
      }
    })

    iconBg.on('click', () => {
      this.onIconClick?.({
        meta: this.meta,
        filterRelativePos: this.calcFilterRelativeX()
      })
    })
  }

  renderFilterIcon(position: Record<'x' | 'y' | 'width' | 'height', number>) {
    const { x, y, width, height } = position
    const icon = new GuiIcon({
      name: 'SortDown',
      x,
      y,
      width,
      height,
      fill: 'rgb(67, 72, 91)',
      cursor: "pointer"
    })
    this.add(icon)

    icon.on('click', () => {
      this.onIconClick?.({
        meta: this.meta,
        filterRelativePos: this.calcFilterRelativeX()
      })
    })
  }

  calcFilterRelativeX() {
    const iconBg = this.find(item => item.cfg.name === 'iconBg')
    const box = iconBg.getBBox()
    return {
      x: box.x,
      y: box.y + box.height
    }
  }
}

export class ColCellClickInteraction extends BaseEvent {
  bindEvents() {
    this.spreadsheet.on(S2Event.COL_CELL_CLICK, (event) => {
      event.preventDefault()
    })
  }
}
