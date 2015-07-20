cmake_minimum_required(VERSION 3.2)
project(jpegfacade)

get_filename_component(ROOT_DIR "${CMAKE_CURRENT_SOURCE_DIR}" PATH)
message(STATUS "ROOT_DIR: " ${ROOT_DIR})

include(${ROOT_DIR}/shared.cmake)

find_package(JPEG REQUIRED)
include_directories(${JPEG_INCLUDE_DIRS})

set(FACADE_DIR ${ROOT_DIR}/jpegfacade)

set(FACADE_SOURCES
  ${FACADE_DIR}/facade.c
)

add_compile_options(
  -Wall
  -fPIC
)

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -std=c11")

add_library(jpegfacade SHARED ${FACADE_SOURCES})
target_link_libraries(jpegfacade ${JPEG_LIBRARIES})
