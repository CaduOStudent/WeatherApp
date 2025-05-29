import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

import SavedLocationCard from '@/utils/SavedLocationCard'

export default function search() {
  return (
    <View style ={styles.body}>

    <View style ={styles.TopSection}>
      <Text>search</Text>
    </View>
    <ScrollView 
    bounces={false}
    style={styles.SavedCards}>
      <SavedLocationCard/>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{

  },
  TopSection:{

  },
  SavedCards:{
    
  },
})