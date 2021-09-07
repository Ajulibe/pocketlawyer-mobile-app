import React, {useState} from "react";
import {Button, TextInput as Input, View, StyleSheet} from "react-native";
import * as DocumentPicker from "expo-document-picker"; // expo install expo-document-picker
import * as FileSystem from "expo-file-system"; // expo install expo-file-system
import PDFReader from "rn-pdf-reader-js"; // for displaying pdf file on screen
import * as Print from "expo-print";

const PickDocument = () => {
  const [pdfUri, setPdfUri] = useState("");

  // DOCUMENT SELECTION
  async function selectDocument() {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // to accept all types(MIME) of file.... "image/*" is for accepting only image
      copyToCacheDirectory: true,
      // multiple: true,
    });
    //setPdfUri(result.uri) // to use when we want to view

    //convert uri to base64
    let fileBase64 = await FileSystem.readAsStringAsync(result?.uri, {
      encoding: "base64",
    });
    setPdfUri(`data:application/pdf;base64,${fileBase64}`); // to use when we want to view
    console.log({base64: `data:application/pdf;base64,${fileBase64}`});
  }

  // PRINTING/DPWNLOADING OF PDF by providing only the uri or "data:application/pdf;base64,${base64string}"
  // we can also create the pdf to download by creating the pdf content using the html option.
  // but you can only provide either the uri option(if you already have a pdf you want to download) or provide
  // html option to create a new pdf.
  async function handlePdfPrint_Download() {
    Print.printAsync({
      //uri: pdfUri,
      html: `<div>
                        <p style="color: green; font-weight: bold; font-size: 28px">Welcome to the world</p>
                        <p style="color: red">We want to print this</p>
                    </div>`,
    });
  }

  return (
    <View style={{flex: 1}}>
      <Button title="Pick document" onPress={selectDocument} />
      <Button title="Print document" onPress={handlePdfPrint_Download} />
      {pdfUri ? (
        <PDFReader
          source={{base64: pdfUri}}
          //source={{ uri: pdfUri }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});
export default PickDocument;
