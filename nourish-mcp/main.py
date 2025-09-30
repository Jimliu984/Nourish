from mcp.server.fastmcp import FastMCP
mcp = FastMCP("NourishMCPServer")

@mcp.tool()
def getAllTags():
    """Gets all tags from Nourish"""
    return 


if __name__ == "__main__":
    main()
