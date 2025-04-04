# Compiler
CXX = g++
CXXFLAGS = -std=c++17 -Wall -I$(SRCDIR) -I$(INCDIR) -I$(TESTDIR)
LDFLAGS =

# Directories
SRCDIR = src
OBJDIR = build
BINDIR = build
INCDIR = include
TESTDIR = test

# Executables
EXECUTABLE = $(BINDIR)/taxCalculator
TEST_EXECUTABLE = $(BINDIR)/test

# Source and Object files
SOURCES = $(wildcard $(SRCDIR)/*.cpp)
OBJECTS = $(patsubst $(SRCDIR)/%.cpp, $(OBJDIR)/%.o, $(SOURCES))

# Test sources and objects
TEST_SOURCES = $(filter-out $(SRCDIR)/main.cpp, $(SOURCES)) $(wildcard $(TESTDIR)/*.cpp)
TEST_OBJECTS = $(patsubst $(TESTDIR)/%.cpp, $(OBJDIR)/%.o, $(wildcard $(TESTDIR)/*.cpp))

# Default rule
all: $(EXECUTABLE)

# Compile the main executable
$(EXECUTABLE): $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CXX) $(LDFLAGS) $(OBJECTS) -o $@

# Compile test executable
test: $(TEST_EXECUTABLE)

$(TEST_EXECUTABLE): $(filter-out $(OBJDIR)/main.o, $(OBJECTS)) $(TEST_OBJECTS)
	@mkdir -p $(BINDIR)
	$(CXX) $(LDFLAGS) $^ -o $@

# Compile object files from src/
$(OBJDIR)/%.o: $(SRCDIR)/%.cpp
	@mkdir -p $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Compile object files from test/
$(OBJDIR)/%.o: $(TESTDIR)/%.cpp
	@mkdir -p $(OBJDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Clean build files
clean:
	rm -rf $(OBJDIR) $(BINDIR)

# Run the main program
run: $(EXECUTABLE)
	./$(EXECUTABLE)

# Run tests
run-test: test
	./$(TEST_EXECUTABLE)

# Display help
help:
	@echo "Usage:"
	@echo "  make          - Build the project"
	@echo "  make test     - Build tests"
	@echo "  make run-test - Run tests"
	@echo "  make run      - Build and run the project"
	@echo "  make clean    - Clean the build directory"
	@echo "  make help     - Display this help message"

.PHONY: all clean run run-test test help