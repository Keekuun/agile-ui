/*******************************************************************************
 *Copyright (C) 2017 Resin.io, FBK, Jolocom.
 *All rights reserved. This program and the accompanying materials
 *are made available under the terms of the Eclipse Public License 2.0
 *which accompanies this distribution, and is available at
 *https://www.eclipse.org/legal/epl-2.0/
 *
 *SPDX-License-Identifier: EPL-2.0
 *
 *Contributors:
 *    Resin.io, FBK, Jolocom - initial API and implementation
 ******************************************************************************/
import sortBy from 'lodash/sortBy'
import omit from 'lodash/omit'

export function devices(state = {}, action) {
  switch (action.type) {
    case 'DEVICE':
      return {
        ...state,
        [action.data.deviceId]: action.data
      }
    case 'DEVICES':
      return action.data
    case 'DEVICES_DELETE':
      return omit(state, action.data)
    case 'DEVICES_CREATE':
      return {
        ...state,
        [action.data.deviceId]: action.data
      }
    default:
      return state
  }
}

export function cloudUpload(state = {}, action) {
  switch (action.type) {
    case 'DEVICE_ID':
      return Object.assign({}, state, { deviceId: action.data })
    case 'COMPOENT_ID':
      return Object.assign({}, state, { componentId: action.data })
    case 'START_DATE':
      return Object.assign({}, state, { startDate: action.data })
    case 'END_DATE':
      return Object.assign({}, state, { endDate: action.data })
    case 'PROVIDER':
      return Object.assign({}, state, { provider: action.data })
    default:
      return state
  }
}

export function cloudProviders(state = [], action) {
  switch (action.type) {
    case 'CLOUD_PROVIDERS':
      return action.data
    default:
      return state
  }
}

export function credentials(state = {}, action) {
  switch (action.type) {
    case 'CREDENTIALS':
      return action.data
    default:
      return state
  }
}

export function currentUser(state = {}, action) {
  switch (action.type) {
    case 'CURRENT_USER':
      return action.data
    default:
      return state
  }
}

export function entityPolicies(state = {}, action) {
  switch (action.type) {
    case 'ENTITY_POLICIES':
      return action.data
    default:
      return state
  }
}

export function localStorage(state = {}, action) {
  switch (action.type) {
    case 'POLICIES':
      return {
        ...state,
        [action.data.deviceID]: action.data.policies
      }
    default:
      return state
  }
}

const defaultConfirmationSCreenState = {
  render: false,
  message: '',
  onConfirm: () => {}
}

export function confirmationScreen(state = defaultConfirmationSCreenState, action) {
  switch (action.type) {
    case 'CONFIRMATION_SHOW':
      return {
        render: action.data.render,
        message: action.data.message,
        onConfirm: action.data.onConfirm
      }
    case 'CONFIRMATION_HIDE':
      return defaultConfirmationSCreenState
    default:
      return state
  }
}

export function entityList(state = [], action) {
  switch (action.type) {
    case 'ENTITIES':
      return action.data
    case 'ENTITY_DELETE':
      return state.filter(
        element => (element.user_name ? element.user_name !== action.data : element.name !== action.data)
      )
    case 'GROUP_DELETE':
      return state.filter(element => element.owner !== action.data.owner || element.group_name !== action.data.group_name);
    case 'ENTITY_ADDED_GROUP':
    case 'ENTITY_REMOVED_GROUP':
    case 'ENTITY_ATTRIBUTE_SET':
      return state.map(entity => {
        if (entity.id === action.data.id && entity.type === action.data.type) {
          entity = action.data
        }
        return entity
      })
    default:
      return state
  }
}

export function policies(state = {}, action) {
  switch (action.type) {
    case 'ENTITY_FIELD_LOCKS':
      return action.data
    case 'POLICY_DELETE':
      return action.data
    case 'POLICY_SET':
      return action.data
    default:
      return state
  }
}

export function lockFields(state = {}, action) {
  switch(action.type) {
    case 'ADD_WRITE_LOCK_FIELD':
    case 'ADD_READ_LOCK_FIELD':
      let newState = Object.assign({}, state)
      if(!newState[action.data.type]) {
        newState[action.data.type] = []
      }
      newState[action.data.type].push(action.data.policy)
      return  newState
    case 'REMOVE_WRITE_LOCK_FIELD':
    case 'REMOVE_READ_LOCK_FIELD':
      if(state[action.data.type]) {
        let newState = Object.assign({}, state)
        newState[action.data.type] = newState[action.data.type].map(policy => {
          return policy !== action.data.policy
        })
        return newState
      } else {
        return state
      }
    default:
      return state;
  }
}

export function lockFormats(state = {}, action) {
  switch (action.type) {
    case 'LOCK_FORMATS':
      return action.data
    default:
      return state
  }
}

export function form(state = {}, action) {
  switch(action.type) {
    case 'FORM_SELECTED':
      let newState = Object.assign({}, state)
      if(!newState[action.data.policy]) {
        newState[action.data.policy] = {}
      }
      newState[action.data.policy][action.data.type] = action.data.formNames
      return newState;
    default:
      return state
  }
}

export function groups(state = [], action) {
  switch (action.type) {
    case 'GROUPS':
      return action.data
    default:
      return state
  }
}

export function input(state = {}, action) {
  switch (action.type) {
    case 'INPUT_NAME':
      state.input_name = action.data
      return state
    case 'INPUT_VALUE':
      state.input_value = action.data
      return state
    case 'INPUT_OLD_PASSWORD':
      state.old_password = action.data
      return state
    case 'INPUT_NEW_PASSWORD':
      state.new_password = action.data
      return state
    default:
      return state
  }
}

export function schemas(state = {}, action) {
  switch (action.type) {
    case 'SCHEMA':
      return action.data
    default:
      return state
  }
}

export function devicesDiscover(state = [], action) {
  switch (action.type) {
    case 'DEVICES_DISCOVER':
      return action.data
    case 'DEVICES_CREATE':
      return state.filter(element => element.name !== action.data.name)
    default:
      return state
  }
}

export function messages(state = [], action) {
  switch (action.type) {
    case 'MESSAGE':
      return [action.data, ...state]
    case 'MESSAGE_REMOVE':
      let newState = state.filter(i => i !== action.data)
      return newState
    default:
      return state
  }
}

const defLoadingState = {
  generic: false,
  devices: false,
  entity: false,
  recommender: false
}

export function loading(state = defLoadingState, action) {
  switch (action.type) {
    case 'ENTITY_LOADING':
      return {
        ...state,
        entity: action.data
      }
    case 'DEVICES_LOADING':
      return {
        ...state,
        devices: action.data
      }
    case 'RECOMMENDER_LOADING':
      return {
        ...state,
        recommender: action.data
      }
    case 'LOADING':
      return {
        ...state,
        generic: action.data
      }
    default:
      return state
  }
}

export function discovery(state = false, action) {
  switch (action.type) {
    case 'DISCOVERY':
      return action.data
    default:
      return state
  }
}

export function drawer(state = false, action) {
  switch (action.type) {
    case 'DRAWER':
      return !state
    default:
      return state
  }
}

export function protocols(state = [], action) {
  switch (action.type) {
    case 'PROTOCOLS':
      return action.data
    default:
      return state
  }
}

export function deviceTypes(state = {}, action) {
  switch (action.type) {
    case 'DEVICE_TYPES':
      if (action.data.types.length > 0) {
        return {
          ...state,
          [action.data.id]: action.data.types
        }
      }
      return state
    default:
      return state
  }
}

export function records(state = {}, action) {
  switch (action.type) {
    case 'DEVICE_RECORDS':
      const { deviceId, componentId } = action.data
      const records = {
        ...state[deviceId],
        [componentId]: action.data.records.map(rec => [new Date(rec.lastUpdate), parseInt(rec.value, 10)])
      }

      return {
        ...state,
        [deviceId]: records
      }
    default:
      return state
  }
}

export function streams(state = {}, action) {
  switch (action.type) {
    case 'STREAMS':
      const { deviceId } = action.data
      return {
        ...state,
        [deviceId]: sortBy(action.data.streams, 'componentID')
      }

    case 'STREAMS_UPDATE':
      const { record } = action.data
      const { deviceID, componentID } = record

      if (!state[deviceID].length) {
        return {
          [deviceID]: [record]
        }
      }

      const newState = Object.assign({}, state)
      newState[deviceID] = state[deviceID].filter(stream => stream.componentID !== componentID)
      newState[deviceID] = newState[deviceID].concat(record)
      newState[deviceID] = newState[deviceID].sort((first, second) => {
        if (first.componentID < second.componentID) return -1
        if (first.componentID > second.componentID) return 1
        return 0
      })
      return newState

    default:
      return state
  }
}

export function recommendations(state = [], action) {
  switch (action.type) {
    case 'RECOMMENDATIONS':
      return action.data
    default:
      return state
  }
}
