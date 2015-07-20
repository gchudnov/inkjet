#ifndef LIBJPEG_IO_LIBJPEG_FACADE_H
#define LIBJPEG_IO_LIBJPEG_FACADE_H

#ifdef __cplusplus
extern "C" {
#endif

void encode_jpeg(unsigned char* rgb_buffer, unsigned int rgb_width, unsigned int rgb_height, int quality, unsigned char** out_buffer, unsigned long* out_size);
void decode_jpeg(unsigned char* jpeg_buffer, unsigned long jpeg_size, unsigned char** out_buffer, unsigned int* out_width,  unsigned int* out_height);

#ifdef __cplusplus
}
#endif

#endif //LIBJPEG_IO_LIBJPEG_FACADE_H
