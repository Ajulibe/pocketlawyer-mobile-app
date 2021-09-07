import React, {useEffect, useState, useRef} from "react";
import {Image} from "react-native";
import * as FileSystem from "expo-file-system";
import * as CONST from "./consts";

interface Props {
  source: any;
  cacheKey: string;
  onPress: () => void;
}

/**
 *
 * @param props
 * an unsuccesfful attempt at caching profile image
 * it can be revised in a later version.
 */

const CachedAvatarImage = (props: Props) => {
  const {
    source: {uri},
    cacheKey,
  } = props;
  const fileURI = `${CONST.IMAGE_CACHE_FOLDER}${cacheKey}`;
  const [imgUri, setImgUri] = useState(fileURI);
  const componentIsMounted = useRef(true);

  const _callback = (downloadProgress: any) => {
    if (componentIsMounted.current === false) {
      downloadResumableRef.current.pauseAsync();
    }
  };

  const downloadResumableRef = useRef(
    FileSystem.createDownloadResumable(
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      fileURI,
      {},
      _callback,
    ),
  );

  useEffect(() => {
    loadImage();
    return () => {
      componentIsMounted.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadImage = async () => {
    try {
      // Use the cached image if it exists
      const metadata = await FileSystem.getInfoAsync(fileURI);
      if (!metadata.exists) {
        // download to cache
        if (componentIsMounted.current) {
          await downloadResumableRef.current.downloadAsync();
          if (componentIsMounted.current) {
            setImgUri(`${fileURI}?`); // deep clone to force re-render
          }
        }
      }
    } catch (err) {}
  };

  if (!imgUri) return null;

  return (
    <Image
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      source={{
        uri: imgUri,
      }}
    />
  );
};

export const CacheManager = {
  addToCache: async ({file, key}: any) => {
    await FileSystem.copyAsync({
      from: file,
      to: `${CONST.IMAGE_CACHE_FOLDER}${key}`,
    });
    // const uri = await FileSystem.getContentUriAsync(`${CONST.IMAGE_CACHE_FOLDER}${key}`)
    // return uri
    const uri = await CacheManager.getCachedUri({key});
    return uri;
  },

  getCachedUri: async ({key}: any) => {
    const uri = await FileSystem.getContentUriAsync(
      `${CONST.IMAGE_CACHE_FOLDER}${key}`,
    );
    return uri;
  },
};

export default CachedAvatarImage;
