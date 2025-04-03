# Compiler
CXX = g++
CXXFLAGS = -std=c++11 -Wall
LDFLAGS =

# Directories
SRCDIR = src
OBJDIR = build
BINDIR = build
INCDIR = include

# Executable name
EXECUTABLE = $(BINDIR)/taxCalculator

# Source and Object files
SOURCES = $(wildcard $(SRCDIR)/*.cpp)
OBJECTS = $(patsubst $(SRCDIR)/%.cpp, $(OBJDIR)/%.o, $(SOURCES))

# Default rule
all: $(EXECUTABLE)

# Compile the executable
$(EXECUTABLE): $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CXX) $(LDFLAGS) $(OBJECTS) -o $@

# Compile object files
$(OBJDIR)/%.o: $(SRCDIR)/%.cpp
	@mkdir -p $(OBJDIR)
	$(CXX) $(CXXFLAGS) -I$(INCDIR) -c $< -o $@

# Clean build files
clean:
	rm -rf $(OBJDIR) $(BINDIR)

# Run the program
run: $(EXECUTABLE)
	./$(EXECUTABLE)

# Display help
help:
	@echo "Usage:"
	@echo "  make          - Build the project"
	@echo "  make run      - Build and run the project"
	@echo "  make clean    - Clean the build directory"
	@echo "  make help     - Display this help message"

.PHONY: all clean
