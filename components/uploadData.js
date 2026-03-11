import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback, // Added this
  Keyboard // Added this
} from 'react-native';

export default function UploadData() {
  const [details, setDetails] = useState('');

  return (
    // This wrapper detects taps on the background to close the keyboard
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.inner}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.header}>Enter Details</Text>
            <TouchableOpacity onPress={() => setDetails('')}>
              <Text style={styles.cancelText}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* Text Input Area */}
          <TextInput
            style={styles.textArea}
            placeholder="Type here..."
            placeholderTextColor="#999"
            multiline={true}
            textAlignVertical="top"
            value={details}
            onChangeText={setDetails}
            clearButtonMode="while-editing"
            // This allows the user to hit 'Done' on the keyboard to close it
            returnKeyType="done" 
            blurOnSubmit={true} 
            onSubmitEditing={Keyboard.dismiss}
          />

          {/* Upload Button */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              Keyboard.dismiss(); // Closes keyboard when you press upload
              console.log('Upload Pressed');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Sumit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    padding: 24,
    flex: 1,
    marginTop:20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  cancelText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
  },
  textArea: {
    height: 300, 
    borderWidth: 1.5,
    borderColor: '#1149C8', 
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1149C8',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: 'flex-start',
    minWidth: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});