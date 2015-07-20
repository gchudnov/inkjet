#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <jpeglib.h>
#include "facade.h"

/**
 * Encodes an RGB-buffer to a JPEG
 * @param rgb_buffer
 * @param rgb_width
 * @param rgb_height
 * @param quality
 * @param out_buffer
 * @param out_size
 */
void encode_jpeg(unsigned char* rgb_buffer, unsigned int rgb_width, unsigned int rgb_height, int quality, unsigned char** out_buffer, unsigned long* out_size) {
  struct jpeg_compress_struct cinfo;
  struct jpeg_error_mgr jerr;

  cinfo.err = jpeg_std_error(&jerr);
  jpeg_create_compress(&cinfo);

  cinfo.image_width = rgb_width;
  cinfo.image_height = rgb_height;
  cinfo.input_components = 3;
  cinfo.in_color_space = JCS_RGB;

  jpeg_set_defaults(&cinfo);

  jpeg_set_quality(&cinfo, quality, TRUE);

  jpeg_mem_dest(&cinfo, out_buffer, out_size);

  jpeg_start_compress(&cinfo, TRUE);

  JSAMPROW row_pointer[1];
  int row_stride = rgb_width * 3;
  while (cinfo.next_scanline < cinfo.image_height) {
    row_pointer[0] = &rgb_buffer[cinfo.next_scanline * row_stride];
    jpeg_write_scanlines(&cinfo, row_pointer, 1);
  }

  jpeg_finish_compress(&cinfo);
  jpeg_destroy_compress(&cinfo);
}


/**
 * Decodes JPEG to an RGB buffer
 * @param jpeg_buffer
 * @param jpeg_size
 * @param out_buffer
 * @param out_width
 * @param out_height
 */
void decode_jpeg(unsigned char* jpeg_buffer, unsigned long jpeg_size, unsigned char** out_buffer, unsigned int* out_width,  unsigned int* out_height) {
  struct jpeg_decompress_struct cinfo;
  struct jpeg_error_mgr jerr;

  cinfo.err = jpeg_std_error(&jerr);
  jpeg_create_decompress(&cinfo);

  jpeg_mem_src(&cinfo, jpeg_buffer, jpeg_size);
  jpeg_read_header(&cinfo, TRUE);

  jpeg_start_decompress(&cinfo);

  unsigned int row_stride = cinfo.output_width * cinfo.output_components;
  JSAMPARRAY buffer = (*cinfo.mem->alloc_sarray)((j_common_ptr)&cinfo, JPOOL_IMAGE, row_stride, 1);

  *out_buffer = (unsigned char*)malloc(row_stride * cinfo.output_height);
  *out_width = cinfo.output_width;
  *out_height = cinfo.output_height;
  unsigned char* out_ptr = *out_buffer;

  while (cinfo.output_scanline < cinfo.output_height) {
    jpeg_read_scanlines(&cinfo, buffer, 1);

    memcpy(out_ptr, buffer[0], row_stride);
    out_ptr += row_stride;
  }

  jpeg_finish_decompress(&cinfo);
  jpeg_destroy_decompress(&cinfo);
}
