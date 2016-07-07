import { createSelector  } from 'reselect'

const getNodesById = (state) => state.graphNodes.byId
const getSelectedId = (state) => state.graphNodes.selectedId
const getSelectedIds = (state) => state.graphNodes.selectedIds
const getDraggedIds = (state) => state.graphNodes.draggedIds

export const getPassiveSelectedIds = createSelector(
	[getSelectedId, getSelectedIds],
	(selectedId, selectedIds) => {		
		let passiveSelectedIds = [ ...selectedIds ]
		passiveSelectedIds.splice(passiveSelectedIds.indexOf(selectedId), 1)
		return passiveSelectedIds
	}
)

export const getDraggableIds = createSelector(
	[getNodesById, getDraggedIds],
	(nodesById, draggedIds) => {
		let draggableIds = Object.keys(nodesById).map(x => parseInt(x))
		draggedIds.forEach(x => {
			draggableIds.splice(draggableIds.indexOf(x), 1)
		})
		return draggableIds
	}
)