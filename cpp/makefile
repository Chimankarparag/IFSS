# Compiler
CXX = g++
CXXFLAGS = -Iinclude -Wall -Wextra

# Directories
SRC_DIR = src
BUILD_DIR = build

# Executable name
TARGET = $(BUILD_DIR)/grossSalary

# Source and Object files
SRCS = $(SRC_DIR)/main.cpp $(SRC_DIR)/salary_17_1.cpp $(SRC_DIR)/perquisites_17_2.cpp $(SRC_DIR)/profitsInLieu_17_3.cpp $(SRC_DIR)/foreignRetirement_InGrossIncome.cpp $(SRC_DIR)/grossSalary.cpp $(SRC_DIR)/lessUnder89A.cpp $(SRC_DIR)/details.cpp $(SRC_DIR)/lessUnder10.cpp
OBJS = $(BUILD_DIR)/main.o $(BUILD_DIR)/salary_17_1.o $(BUILD_DIR)/perquisites_17_2.o $(BUILD_DIR)/profitsInLieu_17_3.o $(BUILD_DIR)/foreignRetirement_InGrossIncome.o $(BUILD_DIR)/grossSalary.o $(BUILD_DIR)/lessUnder89A.o $(BUILD_DIR)/details.o $(BUILD_DIR)/lessUnder10.o

# Default rule
all: $(TARGET)

# Compile the executable
$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $@ $^

# Compile object files
$(BUILD_DIR)/%.o: $(SRC_DIR)/%.cpp | $(BUILD_DIR)
	$(CXX) $(CXXFLAGS) -c -o $@ $<

# Create build directory
$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

# Clean build files
clean:
	rm -rf $(BUILD_DIR)/*

# Run the program
run: $(TARGET)
	./$(TARGET)

# Display help
help:
	@echo "Usage:"
	@echo "  make          - Build the project"
	@echo "  make run      - Build and run the project"
	@echo "  make clean    - Clean the build directory"
	@echo "  make help     - Display this help message"
