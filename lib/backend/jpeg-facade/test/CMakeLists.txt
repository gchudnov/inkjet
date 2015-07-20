cmake_minimum_required(VERSION 3.2)
project(jpegfacade_test)

get_filename_component(ROOT_DIR "${CMAKE_CURRENT_SOURCE_DIR}" PATH)
message(STATUS "ROOT_DIR: " ${ROOT_DIR})

include(${ROOT_DIR}/shared.cmake)

find_package(GTest REQUIRED)
include_directories(${GTEST_INCLUDE_DIRS})

find_package(Threads)

set(TEST_DIR ${ROOT_DIR}/test)

# configure path to the data directory
get_filename_component(TEST_DATA_DIR "data" ABSOLUTE)
configure_file(${TEST_DIR}/facade-spec.h.in ${TEST_DIR}/facade-spec.h)

include_directories(${ROOT_DIR}/jpegfacade)

set(TEST_SOURCES
  ${TEST_DIR}/driver.cpp
  ${TEST_DIR}/facade-spec.cpp
)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++14")

add_executable(jpegfacade_test ${TEST_SOURCES})
target_link_libraries(jpegfacade_test ${GTEST_LIBRARIES} ${CMAKE_THREAD_LIBS_INIT} jpegfacade)

# configure unit tests via CTest
enable_testing()
add_test(NAME RunTests COMMAND jpegfacade_test)
