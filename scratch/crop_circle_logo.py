from PIL import Image, ImageDraw
from pathlib import Path

logo_path = Path("public/logo.png")
if not logo_path.exists():
    print("Logo not found at public/logo.png")
    exit(1)

# Open the image and convert to RGBA
img = Image.open(logo_path).convert("RGBA")
width, height = img.size
print(f"Original logo size: {width}x{height}")

# First let's backup original
backup_path = Path("public/logo_original.png")
if not backup_path.exists():
    img.save(backup_path)

# Find the circle boundaries by scanning from corners / edges
# The logo has a gold rim. Let's find the circle center and radius.
# For a square image, center is (width/2, height/2).
center_x = width / 2.0
center_y = height / 2.0

# In the image, the outer edge of the gold ring is very close to the edge.
# Let's inspect along the diagonal or horizontal from edge towards center to find where the non-white pixel starts.
# Or we can detect the exact circle radius.
# Check along center_y from x=0 to center_x
def is_white_or_near_white(rgba):
    r, g, b, a = rgba
    # near white: r > 240, g > 240, b > 240
    return r > 240 and g > 240 and b > 240

# Find first non-white pixel along middle row
left_edge = 0
for x in range(int(center_x)):
    if not is_white_or_near_white(img.getpixel((x, int(center_y)))):
        left_edge = x
        break

right_edge = width - 1
for x in range(width - 1, int(center_x), -1):
    if not is_white_or_near_white(img.getpixel((x, int(center_y)))):
        right_edge = x
        break

top_edge = 0
for y in range(int(center_y)):
    if not is_white_or_near_white(img.getpixel((int(center_x), y))):
        top_edge = y
        break

bottom_edge = height - 1
for y in range(height - 1, int(center_y), -1):
    if not is_white_or_near_white(img.getpixel((int(center_x), y))):
        bottom_edge = y
        break

print(f"Detected circle edges: left={left_edge}, right={right_edge}, top={top_edge}, bottom={bottom_edge}")

detected_center_x = (left_edge + right_edge) / 2.0
detected_center_y = (top_edge + bottom_edge) / 2.0
radius_x = (right_edge - left_edge) / 2.0
radius_y = (bottom_edge - top_edge) / 2.0
radius = min(radius_x, radius_y)

print(f"Center: ({detected_center_x}, {detected_center_y}), radius: {radius}")

# Create high-quality anti-aliased circular alpha mask
# Scale up by 4x for smooth anti-aliasing
scale = 4
mask_size = (width * scale, height * scale)
mask = Image.new("L", mask_size, 0)
draw = ImageDraw.Draw(mask)

bbox = [
    (detected_center_x - radius) * scale,
    (detected_center_y - radius) * scale,
    (detected_center_x + radius) * scale,
    (detected_center_y + radius) * scale
]
draw.ellipse(bbox, fill=255)

# Downsample mask back to original size with high quality Lanczos / Bicubic filter
mask = mask.resize((width, height), Image.Resampling.LANCZOS)

# Apply mask to alpha channel
r, g, b, a = img.split()
# Combine original alpha with circular mask
new_alpha = Image.composite(a, Image.new("L", (width, height), 0), mask)
img.putalpha(new_alpha)

# Save transparent version
img.save("public/logo.png", "PNG", optimize=True)
print("Successfully saved transparent circular logo to public/logo.png")
